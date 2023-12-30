using System;
using System.Collections.Generic;
using System.Linq;
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
using DDDSample1.Infrastructure.Requests;

namespace DDDSample1.Domain.Requests
{
  public class RequestService : IRequestService
  {
    private readonly IUnitOfWork unitOfWork;
    private readonly IRequestRepository repo;
    private readonly ISurveillanceTaskRepository surveillanceTaskRepository;
    private readonly IPickAndDeliveryTaskRepository pickAndDeliveryTaskRepository;

    private static readonly HttpClient httpClient = new();
    private static readonly string BASE_URL = "http://localhost:5000/api";

    public RequestService(IUnitOfWork unitOfWork, IRequestRepository repo, ISurveillanceTaskRepository surveillanceTaskRepository, IPickAndDeliveryTaskRepository pickAndDeliveryTaskRepository)
    {
      this.unitOfWork = unitOfWork;
      this.repo = repo;
      this.surveillanceTaskRepository = surveillanceTaskRepository;
      this.pickAndDeliveryTaskRepository = pickAndDeliveryTaskRepository;
    }

    public async Task<PaginationDTO<RequestDTO>> GetAll(int page, int limit)
    {
      List<Request> requests = await repo.GetAllAsync(page - 1, limit);

      List<RequestDTO> result = new();

      foreach (Request request in requests)
      {
        if (await surveillanceTaskRepository.GetByIdAsync(request.DeviceTaskId) != null)
          result.Add(await ConvertToDTO(request, "SurveillanceRequestDTO"));

        if (await pickAndDeliveryTaskRepository.GetByIdAsync(request.DeviceTaskId) != null)
          result.Add(await ConvertToDTO(request, "PickDeliveryRequestDTO"));
      }

      return new PaginationDTO<RequestDTO>(result, page, limit, await repo.CountAsync());
    }

    public async Task<PaginationDTO<SurveillanceRequestDTO>> GetAllSurveillance(int page, int limit)
    {
      List<Request> requests = await repo.GetAllAsync(page - 1, limit);

      List<SurveillanceRequestDTO> result = new();

      foreach (Request request in requests)
        if (await surveillanceTaskRepository.GetByIdAsync(request.DeviceTaskId) != null)
          result.Add((SurveillanceRequestDTO)await ConvertToDTO(request, "SurveillanceRequestDTO"));

      int count = await surveillanceTaskRepository.CountAsync();

      return new PaginationDTO<SurveillanceRequestDTO>(result, page, limit, count);
    }

    public async Task<PaginationDTO<PickDeliveryRequestDTO>> GetAllPickAndDelivery(int page, int limit)
    {
      List<Request> requests = await repo.GetAllAsync(page - 1, limit);

      List<PickDeliveryRequestDTO> result = new();

      foreach (Request request in requests)
        if (await pickAndDeliveryTaskRepository.GetByIdAsync(request.DeviceTaskId) != null)
          result.Add((PickDeliveryRequestDTO)await ConvertToDTO(request, "PickDeliveryRequestDTO"));

      int count = await pickAndDeliveryTaskRepository.CountAsync();

      return new PaginationDTO<PickDeliveryRequestDTO>(result, page, limit, count);
    }

    public async Task<PaginationDTO<RequestDTO>> GetRequestsByState(RequestState state, int page, int limit)
    {
      List<Request> requests = await repo.GetRequestsByState(state, page - 1, limit);

      List<RequestDTO> result = new();

      foreach (Request request in requests)
      {
        if (await surveillanceTaskRepository.GetByIdAsync(request.DeviceTaskId) != null)
          result.Add(await ConvertToDTO(request, "SurveillanceRequestDTO"));

        if (await pickAndDeliveryTaskRepository.GetByIdAsync(request.DeviceTaskId) != null)
          result.Add(await ConvertToDTO(request, "PickDeliveryRequestDTO"));
      }

      return new PaginationDTO<RequestDTO>(result, page, limit, await repo.CountAsync());
    }

    public async Task<PaginationDTO<PickDeliveryRequestDTO>> GetAllPickAndDeliveryByState(RequestState state, int page, int limit)
    {
      List<PickDeliveryRequestDTO> requests = GetAllPickAndDelivery(-1, -1).Result.data;
      List<PickDeliveryRequestDTO> result = new();

      foreach (PickDeliveryRequestDTO request in requests)
        if (request.State == state.State.ToString())
          result.Add(request);


      return new PaginationDTO<PickDeliveryRequestDTO>(result, page, limit, await repo.CountAsync());
    }



    public async Task<RequestDTO> GetById(RequestId id)
    {
      Request request = await repo.GetByIdAsync(id);
      if (request == null) return null;

      if (await surveillanceTaskRepository.GetByIdAsync(request.DeviceTaskId) != null)
        return await ConvertToDTO(request, "SurveillanceRequestDTO");

      if (await pickAndDeliveryTaskRepository.GetByIdAsync(request.DeviceTaskId) != null)
        return await ConvertToDTO(request, "PickDeliveryRequestDTO");

      return null;
    }

    public async Task<RequestDTO> AddSurveillanceRequest(RequestDTO dto)
    {
      try
      {
        SurveillanceTask task = await surveillanceTaskRepository.GetByIdAsync(new DeviceTaskId(dto.DeviceTaskId));
        if (task == null) return null;

        Request r = new(new DeviceTaskId(dto.DeviceTaskId), dto.DeviceId);
        await repo.AddAsync(r);
        await unitOfWork.CommitAsync();

        return await ConvertToDTO(r, "SurveillanceRequestDTO");
      }
      catch (Exception e)
      {
        Console.WriteLine($"Exception: {e.Message}");
        throw;
      }

    }

    public async Task<RequestDTO> AddPickAndDeliveryRequest(RequestDTO dto)
    {
      try
      {
        PickAndDeliveryTask task = await pickAndDeliveryTaskRepository.GetByIdAsync(new DeviceTaskId(dto.DeviceTaskId));
        if (task == null) return null;

        Request r = new(new DeviceTaskId(dto.DeviceTaskId), dto.DeviceId);
        await repo.AddAsync(r);
        await unitOfWork.CommitAsync();

        return await ConvertToDTO(r, "PickDeliveryRequestDTO");
      }
      catch (Exception e)
      {
        Console.WriteLine($"Exception: {e.Message}");
        throw;
      }

    }

    public async Task<RequestDTO> Update(RequestDTO dto)
    {
      Request request = await repo.GetByIdAsync(new RequestId(dto.Id));
      if (request == null) return null;

      // update fields
      request.ChangeState(
        dto.State == "Pending" ? new RequestState(StateEnum.Pending) : dto.State == "Accepted" ? new RequestState(StateEnum.Accepted) : new RequestState(StateEnum.Rejected)
      );

      await unitOfWork.CommitAsync();

      return await ConvertToDTO(request, dto.GetType().Name);
    }

    public async Task<RequestDTO> Put(RequestDTO dto)
    {
      Request request = await repo.GetByIdAsync(new RequestId(dto.Id));
      if (request == null) return null;

      // update fields
      request.ChangeState(
        dto.State == "Pending" ? new RequestState(StateEnum.Pending) : dto.State == "Accepted" ? new RequestState(StateEnum.Accepted) : new RequestState(StateEnum.Rejected)
      );

      await unitOfWork.CommitAsync();
      return await ConvertToDTO(request, dto.GetType().Name);
    }

    public async Task<RequestDTO> Delete(RequestId id)
    {
      Request request = await repo.GetByIdAsync(id);
      if (request == null) return null;

      repo.Remove(request);
      await unitOfWork.CommitAsync();

      return null;
    }

    private async Task<RequestDTO> ConvertToDTO(Request r, string type)
    {
      if (type.Equals("SurveillanceRequestDTO"))
      {
        SurveillanceTask task = await surveillanceTaskRepository.GetByIdAsync(r.DeviceTaskId);
        if (task == null) return null;

        return new SurveillanceRequestDTO(
            r.Id.Value,
            task.Description.Value,
            r.RequestedAt.ToString(),
            r.State.State.ToString(),
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

      if (type.Equals("PickDeliveryRequestDTO"))
      {
        PickAndDeliveryTask task = await pickAndDeliveryTaskRepository.GetByIdAsync(r.DeviceTaskId);
        if (task == null) return null;

        return new PickDeliveryRequestDTO(
            r.Id.Value,
            task.Description.Value,
            r.RequestedAt.ToString(),
            r.State.State.ToString(),
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

    public async Task<RequestDTO> AcceptRequest(RequestId id)
    {
      Request request = await repo.GetByIdAsync(id);
      if (request == null) return null;

      // update fields
      request.ChangeState(
        new RequestState(StateEnum.Accepted)
      );

      await unitOfWork.CommitAsync();


      if (await surveillanceTaskRepository.GetByIdAsync(request.DeviceTaskId) != null)
        return await ConvertToDTO(request, "SurveillanceRequestDTO");


      if (await pickAndDeliveryTaskRepository.GetByIdAsync(request.DeviceTaskId) != null)
        return await ConvertToDTO(request, "PickDeliveryRequestDTO");

      return null;
    }

    public async Task<RequestDTO> RejectRequest(RequestId id)
    {
      Request request = await repo.GetByIdAsync(id);
      if (request == null) return null;

      // update fields
      request.ChangeState(
        new RequestState(StateEnum.Rejected)
      );

      await unitOfWork.CommitAsync();


      if (await surveillanceTaskRepository.GetByIdAsync(request.DeviceTaskId) != null)
        return await ConvertToDTO(request, "SurveillanceRequestDTO");

      if (await pickAndDeliveryTaskRepository.GetByIdAsync(request.DeviceTaskId) != null)
        return await ConvertToDTO(request, "PickDeliveryRequestDTO");

      return null;
    }

    public async Task<SequenceDTO> GetApprovedTasksSequence()
    {
      using HttpResponseMessage response = await httpClient.GetAsync(BASE_URL + "/sequence");

      response.EnsureSuccessStatusCode();
      var jsonResponse = await response.Content.ReadFromJsonAsync<SequenceResponseDTO>() ?? throw new Exception("Error getting sequence");
      List<DeviceTask> tasks = new();

      foreach (string taskId in jsonResponse.tasks)
      {
        DeviceTask task = await pickAndDeliveryTaskRepository.GetByIdAsync(new DeviceTaskId(taskId));
        if (task == null) task = await surveillanceTaskRepository.GetByIdAsync(new DeviceTaskId(taskId));

        tasks.Add(task);
      }


      List<PathDTO> fullPath = new();
      foreach (DeviceTask task in tasks)
      {
        string StartFloorCode = task is PickAndDeliveryTask ? ((PickAndDeliveryTask)task).StartFloorCode : ((SurveillanceTask)task).FloorId.Value;
        string EndFloorCode = task is PickAndDeliveryTask ? ((PickAndDeliveryTask)task).EndFloorCode : ((SurveillanceTask)task).FloorId.Value;

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
