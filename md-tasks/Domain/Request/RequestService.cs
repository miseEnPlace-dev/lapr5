using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using DDDSample1.Domain.DeviceTasks;
using DDDSample1.Domain.DeviceTasks.PickAndDeliveryTask;
using DDDSample1.Domain.DeviceTasks.SurveillanceTask;
using DDDSample1.Domain.DTO;
using DDDSample1.Domain.Floor;
using DDDSample1.Domain.Room;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.User;
using DDDSample1.Infrastructure.Requests;

namespace DDDSample1.Domain.Requests
{
  public class RequestService : IRequestService
  {
    private readonly IUnitOfWork unitOfWork;
    private readonly IRequestRepository repo;
    private readonly ISurveillanceTaskRepository surveillanceTaskRepository;
    private readonly IPickAndDeliveryTaskRepository pickAndDeliveryTaskRepository;

    private static HttpClient httpClient = new()
    {
      BaseAddress = new Uri("http://localhost:3000/api")
    };

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

      return new PaginationDTO<SurveillanceRequestDTO>(result, page, limit, await repo.CountAsync());
    }

    public async Task<PaginationDTO<PickDeliveryRequestDTO>> GetAllPickAndDelivery(int page, int limit)
    {
      List<Request> requests = await repo.GetAllAsync(page - 1, limit);

      List<PickDeliveryRequestDTO> result = new();

      foreach (Request request in requests)
        if (await pickAndDeliveryTaskRepository.GetByIdAsync(request.DeviceTaskId) != null)
          result.Add((PickDeliveryRequestDTO)await ConvertToDTO(request, "PickDeliveryRequestDTO"));

      return new PaginationDTO<PickDeliveryRequestDTO>(result, page, limit, await repo.CountAsync());
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
      List<Request> requests = await repo.GetRequestsByTypeAndByState(state, "pick_delivery", page - 1, limit);

      List<PickDeliveryRequestDTO> result = new();

      foreach (Request request in requests)
      {

        if (await pickAndDeliveryTaskRepository.GetByIdAsync(request.DeviceTaskId) != null)
          result.Add((PickDeliveryRequestDTO)await ConvertToDTO(request, "PickDeliveryRequestDTO"));
      }

      return new PaginationDTO<PickDeliveryRequestDTO>(result, page, limit, await repo.CountAsync());
    }

    public async Task<PaginationDTO<RequestDTO>> GetRequestsByUserId(string userId, int page, int limit)
    {
      List<Request> requests = await repo.GetRequestsByUserId(userId, page - 1, limit);

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

    public async Task<RequestDTO> AddSurveillanceRequest(SurveillanceRequestDTO dto)
    {
      try
      {
        Guard.AgainstNullBulk("Invalid Request", dto.UserId == null || dto.Description == null || dto.UserName == null || dto.PhoneNumber == null || dto.FloorId == null);

        SurveillanceTask task = new(new DeviceTaskId(Guid.NewGuid().ToString()), new TaskDescription(dto.Description), new UserName(dto.UserName), new UserPhoneNumber(dto.PhoneNumber), new FloorId(dto.FloorId));
        await surveillanceTaskRepository.AddAsync(task);
        await unitOfWork.CommitAsync();

        Request r = new(new UserId(dto.UserId), task.Id);
        await repo.AddAsync(r);
        await unitOfWork.CommitAsync();

        return await ConvertToDTO(r, dto.GetType().Name);
      }
      catch (Exception e)
      {
        Console.WriteLine($"Exception: {e.Message}");
        throw;
      }
    }

    public async Task<RequestDTO> AddPickAndDeliveryRequest(PickDeliveryRequestDTO dto)
    {
      try
      {
        Guard.AgainstNullBulk("cannot be null.", dto.UserId, dto.Description, dto.PickupUserName, dto.DeliveryUserName, dto.PickupRoomId, dto.DeliveryRoomId, dto.PickupUserPhoneNumber, dto.DeliveryUserPhoneNumber, dto.ConfirmationCode);

        PickAndDeliveryTask task = new(
          new DeviceTaskId(Guid.NewGuid().ToString()), new TaskDescription(dto.Description),
          new UserName(dto.PickupUserName), new(dto.DeliveryUserName),
          new UserPhoneNumber(dto.PickupUserPhoneNumber), new UserPhoneNumber(dto.DeliveryUserPhoneNumber),
          new RoomId(dto.PickupRoomId), new RoomId(dto.DeliveryRoomId), new ConfirmationCode(dto.ConfirmationCode),
          dto.StartCoordinateX, dto.StartCoordinateY, dto.EndCoordinateX, dto.EndCoordinateY, dto.StartFloorCode, dto.EndFloorCode
        );

        await pickAndDeliveryTaskRepository.AddAsync(task);
        await unitOfWork.CommitAsync();

        Request r = new(new UserId(dto.UserId), task.Id);
        await repo.AddAsync(r);
        await unitOfWork.CommitAsync();

        return await ConvertToDTO(r, dto.GetType().Name);
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
        return new SurveillanceRequestDTO(
            r.Id.Value,
            r.UserId.Value,
            task.Description.Value,
            r.RequestedAt.ToString(),
            r.State.State.ToString(),
            task.UserName.Name,
            task.UserPhoneNumber.PhoneNumber,
            task.FloorId.Value,
            task.Id.Value
        );
      }

      if (type.Equals("PickDeliveryRequestDTO"))
      {
        PickAndDeliveryTask task = await pickAndDeliveryTaskRepository.GetByIdAsync(r.DeviceTaskId);

        return new PickDeliveryRequestDTO(
            r.Id.Value,
            r.UserId.Value,
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
            task.EndFloorCode
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
  }
}
