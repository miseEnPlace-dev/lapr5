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
    private readonly ISurveillanceRequestRepository surveillanceTaskRepository;
    private readonly IPickAndDeliveryRequestRepository pickAndDeliveryTaskRepository;
    private readonly RequestMapper requestMapper;

    private static readonly HttpClient httpClient = new();
    private static readonly string BASE_URL = "http://localhost:5000/api";

    public TaskService(IUnitOfWork unitOfWork, ITaskRepository repo, ISurveillanceRequestRepository surveillanceTaskRepository, IPickAndDeliveryRequestRepository pickAndDeliveryTaskRepository)
    {
      this.unitOfWork = unitOfWork;
      this.taskRepo = repo;
      this.surveillanceTaskRepository = surveillanceTaskRepository;
      this.pickAndDeliveryTaskRepository = pickAndDeliveryTaskRepository;
      this.requestMapper = new RequestMapper(surveillanceTaskRepository, pickAndDeliveryTaskRepository);
    }

    public async Task<TaskDTO> Create(TaskDTO dto)
    {
      try
      {
        DeviceTask task = null;
        SurveillanceRequest surRequest = await surveillanceTaskRepository.GetByIdAsync(new RequestId(dto.RequestId));
        if (surRequest != null) task = new DeviceTask(new RequestId(dto.RequestId), dto.DeviceId);

        PickAndDeliveryRequest pickRequest = await pickAndDeliveryTaskRepository.GetByIdAsync(new RequestId(dto.RequestId));
        if (pickRequest != null) task = new DeviceTask(new RequestId(dto.RequestId), dto.DeviceId);

        if (task == null) return null;
        await taskRepo.AddAsync(task);
        await unitOfWork.CommitAsync();

        return await ConvertToDTO(task, "TaskDTO");
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
        if (await surveillanceTaskRepository.GetByIdAsync(task.RequestId) != null)
          result.Add(await ConvertToDTO(task, "SurveillanceTaskDTO"));

        if (await pickAndDeliveryTaskRepository.GetByIdAsync(task.RequestId) != null)
          result.Add(await ConvertToDTO(task, "PickDeliveryTaskDTO"));
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
        if (await surveillanceTaskRepository.GetByIdAsync(task.RequestId) != null)
          result.Add(await ConvertToDTO(task, "SurveillanceTaskDTO"));

        if (await pickAndDeliveryTaskRepository.GetByIdAsync(task.RequestId) != null)
          result.Add(await ConvertToDTO(task, "PickDeliveryTaskDTO"));
      }

      return new PaginationDTO<TaskDTO>(result, 1, 1, await taskRepo.CountAsync());
    }

    public async Task<PaginationDTO<SurveillanceTaskDTO>> GetAllSurveillance(int page, int limit)
    {
      List<DeviceTask> tasks = await taskRepo.GetAllOrderedByCreatedAt(page - 1, limit);

      List<SurveillanceTaskDTO> result = new();

      foreach (DeviceTask task in tasks)
        if (await surveillanceTaskRepository.GetByIdAsync(task.RequestId) != null)
          result.Add((SurveillanceTaskDTO)await ConvertToDTO(task, "SurveillanceTaskDTO"));

      int count = await surveillanceTaskRepository.CountAsync();

      return new PaginationDTO<SurveillanceTaskDTO>(result, page, limit, count);
    }

    public async Task<PaginationDTO<PickDeliveryTaskDTO>> GetAllPickAndDelivery(int page, int limit)
    {
      List<DeviceTask> tasks = await taskRepo.GetAllOrderedByCreatedAt(page - 1, limit);

      List<PickDeliveryTaskDTO> result = new();

      foreach (DeviceTask task in tasks)
        if (await pickAndDeliveryTaskRepository.GetByIdAsync(task.RequestId) != null)
          result.Add((PickDeliveryTaskDTO)await ConvertToDTO(task, "PickDeliveryTaskDTO"));

      int count = await pickAndDeliveryTaskRepository.CountAsync();

      return new PaginationDTO<PickDeliveryTaskDTO>(result, page, limit, count);
    }
    public async Task<TaskDTO> GetById(TaskId id)
    {
      DeviceTask task = await taskRepo.GetByIdAsync(id);
      if (task == null) return null;

      if (await surveillanceTaskRepository.GetByIdAsync(task.RequestId) != null)
        return await ConvertToDTO(task, "SurveillanceTaskDTO");

      if (await pickAndDeliveryTaskRepository.GetByIdAsync(task.RequestId) != null)
        return await ConvertToDTO(task, "PickDeliveryTaskDTO");

      return null;
    }

    public async Task<TaskDTO> AddSurveillanceRequest(TaskDTO dto)
    {
      try
      {
        SurveillanceRequest task = await surveillanceTaskRepository.GetByIdAsync(new RequestId(dto.RequestId));
        if (task == null) return null;

        DeviceTask r = new(new RequestId(dto.RequestId), dto.DeviceId);
        await taskRepo.AddAsync(r);
        await unitOfWork.CommitAsync();

        return await ConvertToDTO(r, "SurveillanceTaskDTO");
      }
      catch (Exception e)
      {
        Console.WriteLine($"Exception: {e.Message}");
        throw;
      }

    }

    public async Task<TaskDTO> AddPickAndDeliveryRequest(TaskDTO dto)
    {
      try
      {
        PickAndDeliveryRequest task = await pickAndDeliveryTaskRepository.GetByIdAsync(new RequestId(dto.RequestId));
        if (task == null) return null;

        DeviceTask r = new(new RequestId(dto.RequestId), dto.DeviceId);
        await taskRepo.AddAsync(r);
        await unitOfWork.CommitAsync();

        return await ConvertToDTO(r, "PickDeliveryTaskDTO");
      }
      catch (Exception e)
      {
        Console.WriteLine($"Exception: {e.Message}");
        throw;
      }

    }

    public async Task<TaskDTO> Update(TaskDTO dto)
    {
      DeviceTask task = await taskRepo.GetByIdAsync(new TaskId(dto.Id));
      if (task == null) return null;

      await unitOfWork.CommitAsync();

      return await ConvertToDTO(task, dto.GetType().Name);
    }

    public async Task<TaskDTO> Put(TaskDTO dto)
    {
      DeviceTask task = await taskRepo.GetByIdAsync(new TaskId(dto.Id));
      if (task == null) return null;

      await unitOfWork.CommitAsync();
      return await ConvertToDTO(task, dto.GetType().Name);
    }

    public async Task<TaskDTO> Delete(TaskId id)
    {
      DeviceTask task = await taskRepo.GetByIdAsync(id);
      if (task == null) return null;

      taskRepo.Remove(task);
      await unitOfWork.CommitAsync();

      return null;
    }

    private async Task<TaskDTO> ConvertToDTO(DeviceTask r, string type)
    {
      if (type.Equals("SurveillanceTaskDTO"))
      {
        SurveillanceRequest task = await surveillanceTaskRepository.GetByIdAsync(r.RequestId);
        if (task == null) return null;

        return new SurveillanceTaskDTO(
            r.Id.Value,
            task.Description.Value,
            r.CreatedAt.ToString(),
            task.UserName.Name,
            task.UserPhoneNumber.PhoneNumber,
            task.FloorId.Value,
            task.Id.Value,
            task.StartCoordinateX,
            task.StartCoordinateY,
            task.EndCoordinateX,
            task.EndCoordinateY,
            r.DeviceId,
            task.UserId.Value
        );
      }

      if (type.Equals("PickDeliveryTaskDTO"))
      {
        PickAndDeliveryRequest task = await pickAndDeliveryTaskRepository.GetByIdAsync(r.RequestId);
        if (task == null) return null;

        return new PickDeliveryTaskDTO(
            r.Id.Value,
            task.Description.Value,
            r.CreatedAt.ToString(),
            task.PickupUserName.Name,
            task.DeliveryUserName.Name,
            task.PickupUserPhoneNumber.PhoneNumber,
            task.DeliveryUserPhoneNumber.PhoneNumber,
            task.PickupRoomId.Value,
            task.DeliveryRoomId.Value,
            task.Id.Value,
            task.ConfirmationCode.Code,
            task.StartCoordinateX,
            task.StartCoordinateY,
            task.EndCoordinateX,
            task.EndCoordinateY,
            task.StartFloorCode,
            task.EndFloorCode,
            r.DeviceId,
            task.UserId.Value
        );
      }
      return null;
    }

    public async Task<TaskDTO> AcceptRequest(TaskId id)
    {
      DeviceTask request = await taskRepo.GetByIdAsync(id);
      if (request == null) return null;

      await unitOfWork.CommitAsync();


      if (await surveillanceTaskRepository.GetByIdAsync(request.RequestId) != null)
        return await ConvertToDTO(request, "SurveillanceTaskDTO");


      if (await pickAndDeliveryTaskRepository.GetByIdAsync(request.RequestId) != null)
        return await ConvertToDTO(request, "PickDeliveryTaskDTO");

      return null;
    }

    public async Task<TaskDTO> RejectRequest(TaskId id)
    {
      DeviceTask task = await taskRepo.GetByIdAsync(id);
      if (task == null) return null;

      await unitOfWork.CommitAsync();

      if (await surveillanceTaskRepository.GetByIdAsync(task.RequestId) != null)
        return await ConvertToDTO(task, "SurveillanceTaskDTO");

      if (await pickAndDeliveryTaskRepository.GetByIdAsync(task.RequestId) != null)
        return await ConvertToDTO(task, "PickDeliveryTaskDTO");

      return null;
    }

    public async Task<TaskDTO> FinishTask(TaskId id)
    {
      DeviceTask task = await taskRepo.GetByIdAsync(id);
      if (task == null) return null;

      task.Finish();
      await unitOfWork.CommitAsync();

      if (await surveillanceTaskRepository.GetByIdAsync(task.RequestId) != null)
        return await ConvertToDTO(task, "SurveillanceTaskDTO");

      if (await pickAndDeliveryTaskRepository.GetByIdAsync(task.RequestId) != null)
        return await ConvertToDTO(task, "PickDeliveryTaskDTO");

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
        Request request = await pickAndDeliveryTaskRepository.GetByIdAsync(task.RequestId);
        if (request == null)
          taskType = "SurveillanceTaskDTO";

        TaskDTO taskDto = await ConvertToDTO(task, taskType);

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
