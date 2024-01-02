using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using DDDNetCore.Domain.Request;
using DDDNetCore.Services;
using DDDSample1.Domain.DeviceTasks;
using DDDSample1.Domain.DeviceTasks.PickAndDeliveryTasks;
using DDDSample1.Domain.DeviceTasks.SurveillanceTasks;
using DDDSample1.Domain.DTO;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Requests
{
  public class TaskService : ITaskService
  {
    private readonly IUnitOfWork unitOfWork;
    private readonly ITaskRepository taskRepo;
    private readonly TaskMapper mapper;

    private readonly ISurveillanceRequestRepository svReqRepo;
    private readonly IPickAndDeliveryRequestRepository pdReqRepo;

    private static readonly HttpClient httpClient = new();
    private static readonly string BASE_URL = "http://localhost:5000/api";

    public TaskService(IUnitOfWork unitOfWork, ITaskRepository taskRepo, ISurveillanceRequestRepository svReqRepo, IPickAndDeliveryRequestRepository pdReqRepo)
    {
      this.unitOfWork = unitOfWork;
      this.taskRepo = taskRepo;
      this.svReqRepo = svReqRepo;
      this.pdReqRepo = pdReqRepo;
    }

    public async Task<TaskDTO> Create(TaskDTO dto)
    {
      try
      {
        DeviceTask task = null;
        SurveillanceRequest surRequest = await svReqRepo.GetByIdAsync(new RequestId(dto.RequestId));
        if (surRequest != null) task = new DeviceTask(new RequestId(dto.RequestId), dto.DeviceId);

        PickAndDeliveryRequest pickRequest = await pdReqRepo.GetByIdAsync(new RequestId(dto.RequestId));
        if (pickRequest != null) task = new DeviceTask(new RequestId(dto.RequestId), dto.DeviceId);

        if (task == null) return null;
        await taskRepo.AddAsync(task);
        await unitOfWork.CommitAsync();

        return await mapper.ToDto(task, "TaskDTO");
      }
      catch (Exception e)
      {
        Console.WriteLine($"Exception: {e.Message}");
        throw;
      }

    }

    public async Task<PaginationDTO<TaskDTO>> GetAll(int page, int limit)
    {
      List<DeviceTask> tasks = await taskRepo.GetAllOrderedByCreatedAt(page - 1, limit);

      List<TaskDTO> result = new();

      foreach (DeviceTask task in tasks)
      {
        if (task.IsFinished) continue;
        if (await svReqRepo.GetByIdAsync(task.RequestId) != null)
          result.Add(await mapper.ToDto(task, "SurveillanceTaskDTO"));

        if (await pdReqRepo.GetByIdAsync(task.RequestId) != null)
          result.Add(await mapper.ToDto(task, "PickDeliveryTaskDTO"));
      }

      return new PaginationDTO<TaskDTO>(result, page, limit, await taskRepo.CountAsync());
    }

    public async Task<PaginationDTO<TaskDTO>> GetWithDeviceId(string deviceId)
    {
      List<DeviceTask> tasks = await taskRepo.GetAllWithDeviceIdAsync(deviceId);

      List<TaskDTO> result = new();

      foreach (DeviceTask task in tasks)
      {
        if (task.IsFinished) continue;
        if (await svReqRepo.GetByIdAsync(task.RequestId) != null)
          result.Add(await mapper.ToDto(task, "SurveillanceTaskDTO"));

        if (await pdReqRepo.GetByIdAsync(task.RequestId) != null)
          result.Add(await mapper.ToDto(task, "PickDeliveryTaskDTO"));
      }

      return new PaginationDTO<TaskDTO>(result, 1, 1, await taskRepo.CountAsync());
    }

    public async Task<PaginationDTO<SurveillanceTaskDTO>> GetAllSurveillance(int page, int limit)
    {
      List<DeviceTask> tasks = await taskRepo.GetAllOrderedByCreatedAt(page - 1, limit);

      List<SurveillanceTaskDTO> result = new();

      foreach (DeviceTask task in tasks)
        if (await svReqRepo.GetByIdAsync(task.RequestId) != null)
          result.Add((SurveillanceTaskDTO)await mapper.ToDto(task, "SurveillanceTaskDTO"));

      int count = await svReqRepo.CountAsync();

      return new PaginationDTO<SurveillanceTaskDTO>(result, page, limit, count);
    }

    public async Task<PaginationDTO<PickDeliveryTaskDTO>> GetAllPickAndDelivery(int page, int limit)
    {
      List<DeviceTask> tasks = await taskRepo.GetAllOrderedByCreatedAt(page - 1, limit);

      List<PickDeliveryTaskDTO> result = new();

      foreach (DeviceTask task in tasks)
        if (await pdReqRepo.GetByIdAsync(task.RequestId) != null)
          result.Add((PickDeliveryTaskDTO)await mapper.ToDto(task, "PickDeliveryTaskDTO"));

      int count = await pdReqRepo.CountAsync();

      return new PaginationDTO<PickDeliveryTaskDTO>(result, page, limit, count);
    }

    public async Task<TaskDTO> GetById(TaskId id)
    {
      DeviceTask task = await taskRepo.GetByIdAsync(id);
      if (task == null) return null;

      if (await svReqRepo.GetByIdAsync(task.RequestId) != null)
        return await mapper.ToDto(task, "SurveillanceTaskDTO");

      if (await pdReqRepo.GetByIdAsync(task.RequestId) != null)
        return await mapper.ToDto(task, "PickDeliveryTaskDTO");

      return null;
    }

    public async Task<TaskDTO> Delete(TaskId id)
    {
      DeviceTask task = await taskRepo.GetByIdAsync(id);
      if (task == null) return null;

      taskRepo.Remove(task);
      await unitOfWork.CommitAsync();

      return null;
    }

    public async Task<TaskDTO> FinishTask(TaskId id)
    {
      DeviceTask task = await taskRepo.GetByIdAsync(id);
      if (task == null) return null;

      task.Finish();

      SurveillanceRequest sv = await svReqRepo.GetByIdAsync(task.RequestId);
      if (sv != null)
      {
        sv.ChangeState(StateEnum.Executed);
        await unitOfWork.CommitAsync();
        return await mapper.ToDto(task, "SurveillanceTaskDTO");
      }

      PickAndDeliveryRequest pd = await pdReqRepo.GetByIdAsync(task.RequestId);
      if (pd != null)
      {
        pd.ChangeState(StateEnum.Executed);
        await unitOfWork.CommitAsync();
        return await mapper.ToDto(task, "PickDeliveryTaskDTO");
      }

      return null;
    }

    public async Task<SequenceDTO> GetApprovedTasksSequence(string deviceId)
    {
      using HttpResponseMessage response = await httpClient.GetAsync(BASE_URL + "/sequence?deviceId=" + deviceId);

      response.EnsureSuccessStatusCode();
      var jsonResponse = await response.Content.ReadFromJsonAsync<SequenceResponseDTO>() ?? throw new Exception("Error getting sequence");
      List<TaskDTO> tasks = new();

      foreach (string taskId in jsonResponse.tasks)
      {
        DeviceTask task = await taskRepo.GetByIdAsync(new TaskId(taskId));
        string taskType = "PickDeliveryTaskDTO";
        Request request = await pdReqRepo.GetByIdAsync(task.RequestId);
        if (request == null)
          taskType = "SurveillanceTaskDTO";

        TaskDTO taskDto = await mapper.ToDto(task, taskType);

        tasks.Add(taskDto);
      }

      List<PathDTO> fullPath = new();
      foreach (TaskDTO task in tasks)
      {
        string StartFloorCode = task is PickDeliveryTaskDTO ? ((PickDeliveryTaskDTO)task).StartFloorCode : ((SurveillanceTaskDTO)task).FloorId;
        string EndFloorCode = task is PickDeliveryTaskDTO ? ((PickDeliveryTaskDTO)task).EndFloorCode : ((SurveillanceTaskDTO)task).FloorId;

        string url = $"{BASE_URL}/route?fromX={task.StartCoordinateX}&fromY={task.StartCoordinateY}&toX={task.EndCoordinateX}&toY={task.EndCoordinateY}&fromFloor={StartFloorCode}&toFloor={EndFloorCode}&method=elevators";
        using HttpResponseMessage res = await httpClient.GetAsync(url);

        res.EnsureSuccessStatusCode();

        PathDTO path = PathJsonParser.Parse(await res.Content.ReadAsStringAsync());
        path.taskId = task.Id;
        fullPath.Add(path);
      }

      SequenceDTO result = new(tasks, jsonResponse.time, fullPath);
      return result;
    }
  }
}
