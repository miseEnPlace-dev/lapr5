using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MDTasks.Services;
using MDTasks.Domain.DTO;
using MDTasks.Domain.Shared;
using MDTasks.Repositories;
using MDTasks.Mappers;
using MDTasks.Domain.Requests;
using System.Net.Http;
using System.Net.Http.Json;
using MDTasks.Domain.Path;

namespace MDTasks.Domain.Tasks;

public class TaskService : ITaskService
{
  private readonly IUnitOfWork unitOfWork;
  private readonly ITaskRepository repo;
  private readonly ISurveillanceRequestRepository svReqRepo;
  private readonly IPickAndDeliveryRequestRepository pdReqRepo;

  private static readonly HttpClient httpClient = new();
  private static readonly string BASE_URL = "http://localhost:5000/api";

  public TaskService(IUnitOfWork unitOfWork, ITaskRepository repo, ISurveillanceRequestRepository svReqRepo, IPickAndDeliveryRequestRepository pdReqRepo)
  {
    this.unitOfWork = unitOfWork;
    this.repo = repo;
    this.svReqRepo = svReqRepo;
    this.pdReqRepo = pdReqRepo;
  }

  public async Task<PaginationDTO<TaskDTO>> GetAll(int page, int limit)
  {
    List<DeviceTask> tasks = await repo.GetAllAsync(page - 1, limit);

    List<TaskDTO> result = new();

    foreach (DeviceTask task in tasks)
    {
      result.Add(TaskMapper.ToDTO(task));
    }

    return new PaginationDTO<TaskDTO>(result, page, limit, await repo.CountAsync());
  }

  public async Task<PaginationDTO<SurveillanceRequestDTO>> GetAllSurveillance(int page, int limit)
  {
    List<DeviceTask> tasks = await repo.GetAllAsync(page - 1, limit);
    List<SurveillanceRequestDTO> result = new();

    foreach (DeviceTask task in tasks)
    {
      if (await svReqRepo.GetByIdAsync(task.RequestId) != null)
      {
        SurveillanceRequest req = await svReqRepo.GetByIdAsync(task.RequestId);
        if (req != null) result.Add(SurveillanceRequestMapper.ToDTO(req));
      }
    }

    int count = await svReqRepo.CountAsync();
    return new PaginationDTO<SurveillanceRequestDTO>(result, page, limit, count);
  }

  public async Task<PaginationDTO<PickAndDeliveryRequestDTO>> GetAllPickAndDelivery(int page, int limit)
  {
    List<DeviceTask> tasks = await repo.GetAllAsync(page - 1, limit);
    List<PickAndDeliveryRequestDTO> result = new();

    foreach (DeviceTask task in tasks)
    {
      if (await pdReqRepo.GetByIdAsync(task.RequestId) != null)
      {
        PickAndDeliveryRequest req = await pdReqRepo.GetByIdAsync(task.RequestId);
        if (req != null) result.Add(PickAndDeliveryRequestMapper.ToDTO(req));
      }
    }

    int count = await pdReqRepo.CountAsync();
    return new PaginationDTO<PickAndDeliveryRequestDTO>(result, page, limit, count);
  }

  public async Task<TaskDTO> GetById(TaskId id)
  {
    DeviceTask request = await repo.GetByIdAsync(id);
    if (request == null) return null;
    return TaskMapper.ToDTO(request);
  }

  public async Task<RequestDTO> AddSurveillanceTask(TaskDTO dto)
  {
    try
    {
      SurveillanceRequest request = await svReqRepo.GetByIdAsync(new RequestId(dto.RequestId));
      if (request == null) return null;

      DeviceTask t = new(new RequestId(dto.RequestId), dto.DeviceId);
      await repo.AddAsync(t);
      await unitOfWork.CommitAsync();

      return SurveillanceRequestMapper.ToDTO(request);
    }
    catch (Exception e)
    {
      Console.WriteLine($"Exception: {e.Message}");
      throw;
    }
  }

  public async Task<RequestDTO> AddPickAndDeliveryTask(TaskDTO dto)
  {
    try
    {
      PickAndDeliveryRequest request = await pdReqRepo.GetByIdAsync(new RequestId(dto.RequestId));
      if (request == null) return null;

      DeviceTask t = new(new RequestId(dto.RequestId), dto.DeviceId);
      await repo.AddAsync(t);
      await unitOfWork.CommitAsync();

      return PickAndDeliveryRequestMapper.ToDTO(request);
    }
    catch (Exception e)
    {
      Console.WriteLine($"Exception: {e.Message}");
      throw;
    }
  }

  public async Task<TaskDTO> Update(TaskDTO dto)
  {
    DeviceTask t = await repo.GetByIdAsync(new TaskId(dto.Id));
    if (t == null) return null;

    await unitOfWork.CommitAsync();

    return TaskMapper.ToDTO(t);
  }

  public async Task<TaskDTO> Put(TaskDTO dto)
  {
    DeviceTask t = await repo.GetByIdAsync(new TaskId(dto.Id));
    if (t == null) return null;

    await unitOfWork.CommitAsync();
    return TaskMapper.ToDTO(t);
  }

  public async Task<TaskDTO> Delete(TaskId id)
  {
    DeviceTask t = await repo.GetByIdAsync(id);
    if (t == null) return null;

    repo.Remove(t);
    await unitOfWork.CommitAsync();

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
      Request task = await pdReqRepo.GetByIdAsync(new RequestId(taskId));
      if (task == null) task = await svReqRepo.GetByIdAsync(new RequestId(taskId));

      tasks.Add(task);
    }


    List<PathDTO> fullPath = new();
    foreach (Request task in tasks)
    {
      string StartFloorCode = task is PickAndDeliveryRequest ? ((PickAndDeliveryRequest)task).StartFloorCode : ((SurveillanceRequest)task).FloorId.Value;
      string EndFloorCode = task is PickAndDeliveryRequest ? ((PickAndDeliveryRequest)task).EndFloorCode : ((SurveillanceRequest)task).FloorId.Value;

      string url = $"{BASE_URL}/route?fromX={task.GetStartCoordinates().X}&fromY={task.GetStartCoordinates().Y}&toX={task.GetEndCoordinates().X}&toY={task.GetEndCoordinates().Y}&fromFloor={StartFloorCode}&toFloor={EndFloorCode}&method=elevators";
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
