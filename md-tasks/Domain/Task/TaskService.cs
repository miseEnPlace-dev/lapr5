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
    private readonly ITaskRepository repo;
    private readonly ISurveillanceRequestRepository surveillanceTaskRepository;
    private readonly IPickAndDeliveryRequestRepository pickAndDeliveryTaskRepository;

    private static readonly HttpClient httpClient = new();
    private static readonly string BASE_URL = "http://localhost:5000/api";

    public TaskService(IUnitOfWork unitOfWork, ITaskRepository repo, ISurveillanceRequestRepository surveillanceTaskRepository, IPickAndDeliveryRequestRepository pickAndDeliveryTaskRepository)
    {
      this.unitOfWork = unitOfWork;
      this.repo = repo;
      this.surveillanceTaskRepository = surveillanceTaskRepository;
      this.pickAndDeliveryTaskRepository = pickAndDeliveryTaskRepository;
    }

    public async Task<PaginationDTO<TaskDTO>> GetAll(int page, int limit)
    {
      List<DeviceTask> requests = await repo.GetAllAsync(page - 1, limit);

      List<TaskDTO> result = new();

      foreach (DeviceTask request in requests)
      {
        if (await surveillanceTaskRepository.GetByIdAsync(request.DeviceTaskId) != null)
          result.Add(await ConvertToDTO(request, "SurveillanceTaskDTO"));

        if (await pickAndDeliveryTaskRepository.GetByIdAsync(request.DeviceTaskId) != null)
          result.Add(await ConvertToDTO(request, "PickDeliveryTaskDTO"));
      }

      return new PaginationDTO<TaskDTO>(result, page, limit, await repo.CountAsync());
    }

    public async Task<PaginationDTO<SurveillanceTaskDTO>> GetAllSurveillance(int page, int limit)
    {
      List<DeviceTask> requests = await repo.GetAllAsync(page - 1, limit);

      List<SurveillanceTaskDTO> result = new();

      foreach (DeviceTask request in requests)
        if (await surveillanceTaskRepository.GetByIdAsync(request.DeviceTaskId) != null)
          result.Add((SurveillanceTaskDTO)await ConvertToDTO(request, "SurveillanceTaskDTO"));

      int count = await surveillanceTaskRepository.CountAsync();

      return new PaginationDTO<SurveillanceTaskDTO>(result, page, limit, count);
    }

    public async Task<PaginationDTO<PickDeliveryTaskDTO>> GetAllPickAndDelivery(int page, int limit)
    {
      List<DeviceTask> requests = await repo.GetAllAsync(page - 1, limit);

      List<PickDeliveryTaskDTO> result = new();

      foreach (DeviceTask request in requests)
        if (await pickAndDeliveryTaskRepository.GetByIdAsync(request.DeviceTaskId) != null)
          result.Add((PickDeliveryTaskDTO)await ConvertToDTO(request, "PickDeliveryTaskDTO"));

      int count = await pickAndDeliveryTaskRepository.CountAsync();

      return new PaginationDTO<PickDeliveryTaskDTO>(result, page, limit, count);
    }
    public async Task<TaskDTO> GetById(TaskId id)
    {
      DeviceTask request = await repo.GetByIdAsync(id);
      if (request == null) return null;

      if (await surveillanceTaskRepository.GetByIdAsync(request.DeviceTaskId) != null)
        return await ConvertToDTO(request, "SurveillanceTaskDTO");

      if (await pickAndDeliveryTaskRepository.GetByIdAsync(request.DeviceTaskId) != null)
        return await ConvertToDTO(request, "PickDeliveryTaskDTO");

      return null;
    }

    public async Task<TaskDTO> AddSurveillanceRequest(TaskDTO dto)
    {
      try
      {
        SurveillanceRequest task = await surveillanceTaskRepository.GetByIdAsync(new RequestId(dto.DeviceTaskId));
        if (task == null) return null;

        DeviceTask r = new(new RequestId(dto.DeviceTaskId), dto.DeviceId);
        await repo.AddAsync(r);
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
        PickAndDeliveryRequest task = await pickAndDeliveryTaskRepository.GetByIdAsync(new RequestId(dto.DeviceTaskId));
        if (task == null) return null;

        DeviceTask r = new(new RequestId(dto.DeviceTaskId), dto.DeviceId);
        await repo.AddAsync(r);
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
      DeviceTask request = await repo.GetByIdAsync(new TaskId(dto.Id));
      if (request == null) return null;

      await unitOfWork.CommitAsync();

      return await ConvertToDTO(request, dto.GetType().Name);
    }

    public async Task<TaskDTO> Put(TaskDTO dto)
    {
      DeviceTask request = await repo.GetByIdAsync(new TaskId(dto.Id));
      if (request == null) return null;

      await unitOfWork.CommitAsync();
      return await ConvertToDTO(request, dto.GetType().Name);
    }

    public async Task<TaskDTO> Delete(TaskId id)
    {
      DeviceTask request = await repo.GetByIdAsync(id);
      if (request == null) return null;

      repo.Remove(request);
      await unitOfWork.CommitAsync();

      return null;
    }

    private async Task<TaskDTO> ConvertToDTO(DeviceTask r, string type)
    {
      if (type.Equals("SurveillanceTaskDTO"))
      {
        SurveillanceRequest task = await surveillanceTaskRepository.GetByIdAsync(r.DeviceTaskId);
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
            r.DeviceId
        );
      }

      if (type.Equals("PickDeliveryTaskDTO"))
      {
        PickAndDeliveryRequest task = await pickAndDeliveryTaskRepository.GetByIdAsync(r.DeviceTaskId);
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
            r.DeviceId
        );
      }

      return null;
    }

    public async Task<TaskDTO> AcceptRequest(TaskId id)
    {
      DeviceTask request = await repo.GetByIdAsync(id);
      if (request == null) return null;

      await unitOfWork.CommitAsync();


      if (await surveillanceTaskRepository.GetByIdAsync(request.DeviceTaskId) != null)
        return await ConvertToDTO(request, "SurveillanceTaskDTO");


      if (await pickAndDeliveryTaskRepository.GetByIdAsync(request.DeviceTaskId) != null)
        return await ConvertToDTO(request, "PickDeliveryTaskDTO");

      return null;
    }

    public async Task<TaskDTO> RejectRequest(TaskId id)
    {
      DeviceTask request = await repo.GetByIdAsync(id);
      if (request == null) return null;

      await unitOfWork.CommitAsync();

      if (await surveillanceTaskRepository.GetByIdAsync(request.DeviceTaskId) != null)
        return await ConvertToDTO(request, "SurveillanceTaskDTO");

      if (await pickAndDeliveryTaskRepository.GetByIdAsync(request.DeviceTaskId) != null)
        return await ConvertToDTO(request, "PickDeliveryTaskDTO");

      return null;
    }

    public async Task<SequenceDTO> GetApprovedTasksSequence()
    {
      using HttpResponseMessage response = await httpClient.GetAsync(BASE_URL + "/sequence");

      response.EnsureSuccessStatusCode();
      var jsonResponse = await response.Content.ReadFromJsonAsync<SequenceResponseDTO>() ?? throw new Exception("Error getting sequence");
      List<Request> tasks = new();

      foreach (string taskId in jsonResponse.tasks)
      {
        Request task = await pickAndDeliveryTaskRepository.GetByIdAsync(new RequestId(taskId));
        if (task == null) task = await surveillanceTaskRepository.GetByIdAsync(new RequestId(taskId));

        tasks.Add(task);
      }


      List<PathDTO> fullPath = new();
      foreach (Request task in tasks)
      {
        string StartFloorCode = task is PickAndDeliveryRequest ? ((PickAndDeliveryRequest)task).StartFloorCode : ((SurveillanceRequest)task).FloorId.Value;
        string EndFloorCode = task is PickAndDeliveryRequest ? ((PickAndDeliveryRequest)task).EndFloorCode : ((SurveillanceRequest)task).FloorId.Value;

        string url = $"{BASE_URL}/route?fromX={task.StartCoordinateX}&fromY={task.StartCoordinateY}&toX={task.EndCoordinateX}&toY={task.EndCoordinateY}&fromFloor={StartFloorCode}&toFloor={EndFloorCode}&method=elevators";
        using HttpResponseMessage res = await httpClient.GetAsync(url);

        res.EnsureSuccessStatusCode();

        PathDTO path = PathJsonParser.Parse(await res.Content.ReadAsStringAsync());
        path.taskId = task.Id.Value;
        fullPath.Add(path);
      }

      SequenceDTO result = new(tasks, jsonResponse.time, fullPath);
      return result;
    }
  }
}
