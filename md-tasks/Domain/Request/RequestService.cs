using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DDDNetCore.Services;
using DDDSample1.Domain.DeviceTasks.PickAndDeliveryTasks;
using DDDSample1.Domain.DeviceTasks.SurveillanceTasks;
using DDDSample1.Domain.DTO;
using DDDSample1.Domain.Floor;
using DDDSample1.Domain.Requests;
using DDDSample1.Domain.Room;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.User;

namespace DDDSample1.Domain.DeviceTasks;

public class RequestService : IRequestService
{
  private readonly IUnitOfWork unitOfWork;
  private readonly ISurveillanceRequestRepository svReqRepo;
  private readonly IPickAndDeliveryRequestRepository pdReqRepo;
  private readonly RequestMapper mapper;

  private readonly ITaskRepository taskRepo;

  public RequestService(IUnitOfWork unitOfWork, ISurveillanceRequestRepository svReqRepo, IPickAndDeliveryRequestRepository pdReqRepo, ITaskRepository taskRepo)
  {
    this.unitOfWork = unitOfWork;
    this.svReqRepo = svReqRepo;
    this.pdReqRepo = pdReqRepo;
    this.taskRepo = taskRepo;
    mapper = new RequestMapper(svReqRepo, pdReqRepo);
  }

  public async Task<PaginationDTO<RequestDTO>> GetAllAsync(int page, int limit)
  {
    List<Request> surReqs = (await svReqRepo.GetAllOrderedByRequestedAt(-1, -1)).Cast<Request>().ToList();
    List<Request> pickReqs = (await pdReqRepo.GetAllOrderedByRequestedAt(-1, -1)).Cast<Request>().ToList();

    List<Request> reqs = new();
    reqs.AddRange(surReqs);
    reqs.AddRange(pickReqs);

    reqs = reqs.OrderBy(t => t.RequestedAt).ToList();

    // with page and limit, cut the list
    if (page > 0 && limit > 0)
    {
      int offset = (page - 1) * limit;
      reqs = reqs.Skip(offset).Take(limit).ToList();
    }

    List<RequestDTO> result = new();

    foreach (Request request in reqs)
    {
      if (await svReqRepo.GetByIdAsync(request.Id) != null)
        result.Add(await mapper.ToDto(request, "SurveillanceRequestDTO"));

      if (await pdReqRepo.GetByIdAsync(request.Id) != null)
        result.Add(await mapper.ToDto(request, "PickAndDeliveryRequestDTO"));
    }

    return new PaginationDTO<RequestDTO>(result, page, limit, await svReqRepo.CountAsync() + await pdReqRepo.CountAsync());
  }

  public async Task<PaginationDTO<RequestDTO>> GetRequestsByUserIdAsync(UserId id, int page, int limit)
  {
    List<Request> surReqs = (await svReqRepo.GetRequestsByUserIdAsync(id, -1, -1)).Cast<Request>().ToList();
    List<Request> pickReqs = (await pdReqRepo.GetRequestsByUserIdAsync(id, -1, -1)).Cast<Request>().ToList();

    List<Request> requests = new();
    requests.AddRange(surReqs);
    requests.AddRange(pickReqs);

    requests = requests.OrderBy(t => t.RequestedAt).ToList();

    // with page and limit, cut the list
    if (page > 0 && limit > 0)
    {
      int offset = (page - 1) * limit;
      requests = requests.Skip(offset).Take(limit).ToList();
    }

    List<RequestDTO> result = new();

    foreach (Request request in requests)
    {
      if (await svReqRepo.GetByIdAsync(request.Id) != null)
        result.Add(await mapper.ToDto(request, "SurveillanceRequestDTO"));

      if (await pdReqRepo.GetByIdAsync(request.Id) != null)
        result.Add(await mapper.ToDto(request, "PickAndDeliveryRequestDTO"));
    }

    return new PaginationDTO<RequestDTO>(result, page, limit, surReqs.Count + pickReqs.Count);
  }

  public async Task<PaginationDTO<RequestDTO>> GetAllSurveillanceAsync(int page, int limit)
  {
    List<Request> surReqs = (await svReqRepo.GetAllAsync(page - 1, limit)).Cast<Request>().ToList();

    List<Request> requests = new();
    requests.AddRange(surReqs);

    // with page and limit, cut the list
    if (page > 0 && limit > 0)
    {
      int offset = (page - 1) * limit;
      requests = requests.Skip(offset).Take(limit).ToList();
    }

    List<RequestDTO> result = new();

    foreach (Request request in requests)
    {
      result.Add(await mapper.ToDto(request, "SurveillanceRequestDTO"));

      if (await pdReqRepo.GetByIdAsync(request.Id) != null)
        result.Add(await mapper.ToDto(request, "PickAndDeliveryRequestDTO"));
    }

    return new PaginationDTO<RequestDTO>(result, page, limit, await svReqRepo.CountAsync() + await pdReqRepo.CountAsync());
  }

  public async Task<PaginationDTO<RequestDTO>> GetAllPickDeliveryAsync(int page, int limit)
  {
    List<Request> pickRequests = (await pdReqRepo.GetAllAsync(page - 1, limit)).Cast<Request>().ToList();

    List<Request> requests = new();
    requests.AddRange(pickRequests);

    // with page and limit, cut the list
    if (page > 0 && limit > 0)
    {
      int offset = (page - 1) * limit;
      requests = requests.Skip(offset).Take(limit).ToList();
    }

    List<RequestDTO> result = new();

    foreach (Request request in requests)
    {
      result.Add(await mapper.ToDto(request, "PickAndDeliveryRequestDTO"));
    }

    return new PaginationDTO<RequestDTO>(result, page, limit, await pdReqRepo.CountAsync());
  }

  public async Task<RequestDTO> GetByIdAsync(RequestId id)
  {
    Request req = await svReqRepo.GetByIdAsync(id);

    if (req != null)
      return await mapper.ToDto(req, "SurveillanceRequestDTO");

    req = await pdReqRepo.GetByIdAsync(id);
    if (req != null)
      return await mapper.ToDto(req, "PickAndDeliveryRequestDTO");

    return null;
  }

  public async Task<RequestDTO> AddSurveillanceTask(SurveillanceRequestDTO dto)
  {
    try
    {
      SurveillanceRequest r = new(new RequestId(Guid.NewGuid().ToString()), new RequestDescription(dto.Description), new UserName(dto.UserName), new UserPhoneNumber(dto.PhoneNumber), new FloorId(dto.FloorId), dto.StartCoordinateX, dto.StartCoordinateY, dto.EndCoordinateX, dto.EndCoordinateY, new UserId(dto.UserId));
      await svReqRepo.AddAsync(r);
      await unitOfWork.CommitAsync();

      return await mapper.ToDto(r, "SurveillanceRequestDTO");
    }
    catch (Exception e)
    {
      Console.WriteLine($"Exception: {e.Message}");
      throw;
    }
  }

  public async Task<RequestDTO> AddPickAndDeliveryTask(PickAndDeliveryRequestDTO dto)
  {
    try
    {
      PickAndDeliveryRequest r = new(new RequestId(Guid.NewGuid().ToString()), new RequestDescription(dto.Description), new UserName(dto.PickupUserName), new UserName(dto.DeliveryUserName), new UserPhoneNumber(dto.PickupUserPhoneNumber), new UserPhoneNumber(dto.DeliveryUserPhoneNumber), new RoomId(dto.PickupRoomId), new RoomId(dto.DeliveryRoomId), new ConfirmationCode(dto.ConfirmationCode), dto.StartCoordinateX, dto.StartCoordinateY, dto.EndCoordinateX, dto.EndCoordinateY, dto.StartFloorCode, dto.EndFloorCode, new UserId(dto.UserId));
      await pdReqRepo.AddAsync(r);
      await unitOfWork.CommitAsync();

      return await mapper.ToDto(r, "PickAndDeliveryRequestDTO");
    }
    catch (Exception e)
    {
      Console.WriteLine($"Exception: {e.Message}");
      throw;
    }
  }

  public async Task<RequestDTO> UpdateAsync(RequestDTO dto)
  {
    SurveillanceRequest sv = await svReqRepo.GetByIdAsync(new RequestId(dto.Id));

    if (sv != null)
    {
      // change fields...
      await unitOfWork.CommitAsync();
      return await mapper.ToDto(sv, "SurveillanceRequestDTO");
    }

    PickAndDeliveryRequest pd = await pdReqRepo.GetByIdAsync(new RequestId(dto.Id));

    if (pd != null)
    {
      // change fields...
      await unitOfWork.CommitAsync();
      return await mapper.ToDto(sv, "PickAndDeliveryRequestDTO");
    }

    return null;
  }

  public async Task<RequestDTO> DeleteAsync(RequestId id)
  {
    SurveillanceRequest sv = await svReqRepo.GetByIdAsync(id);

    if (sv != null)
    {
      svReqRepo.Remove(sv);
      await unitOfWork.CommitAsync();
      return await mapper.ToDto(sv, "SurveillanceRequestDTO");
    }

    PickAndDeliveryRequest pd = await pdReqRepo.GetByIdAsync(id);

    if (pd != null)
    {
      pdReqRepo.Remove(pd);
      await unitOfWork.CommitAsync();
      return await mapper.ToDto(sv, "PickAndDeliveryRequestDTO");
    }

    return null;
  }

  public async Task<RequestDTO> AcceptRequest(RequestId id, TaskDTO taskDTO)
  {
    SurveillanceRequest sv = await svReqRepo.GetByIdAsync(id);

    if (sv != null)
    {
      sv.ChangeState(StateEnum.Accepted);
      await unitOfWork.CommitAsync();

      DeviceTask t = new(id, taskDTO.DeviceId);
      await taskRepo.AddAsync(t);
      await unitOfWork.CommitAsync();
      return await mapper.ToDto(sv, "SurveillanceRequestDTO");
    }

    PickAndDeliveryRequest pd = await pdReqRepo.GetByIdAsync(id);
    if (pd != null)
    {
      pd.ChangeState(StateEnum.Accepted);
      await unitOfWork.CommitAsync();

      DeviceTask t = new(id, taskDTO.DeviceId);
      await taskRepo.AddAsync(t);
      await unitOfWork.CommitAsync();
      return await mapper.ToDto(pd, "PickAndDeliveryRequestDTO");
    }

    return null;
  }

  public async Task<RequestDTO> RejectRequest(RequestId id)
  {
    SurveillanceRequest sv = await svReqRepo.GetByIdAsync(id);

    if (sv != null)
    {
      sv.ChangeState(StateEnum.Rejected);
      await unitOfWork.CommitAsync();
      return await mapper.ToDto(sv, "SurveillanceRequestDTO");
    }

    PickAndDeliveryRequest pd = await pdReqRepo.GetByIdAsync(id);
    if (pd != null)
    {
      pd.ChangeState(StateEnum.Rejected);
      await unitOfWork.CommitAsync();
      return await mapper.ToDto(pd, "PickAndDeliveryRequestDTO");
    }

    return null;
  }

  public async Task<PaginationDTO<RequestDTO>> GetRequestsByState(RequestState state, int page, int limit)
  {
    List<Request> sv = (await svReqRepo.GetRequestsByState(state, -1, -1)).Cast<Request>().ToList();
    List<Request> pd = (await pdReqRepo.GetRequestsByState(state, -1, -1)).Cast<Request>().ToList();

    List<Request> requests = new();
    requests.AddRange(sv);
    requests.AddRange(pd);

    requests = requests.OrderBy(t => t.RequestedAt).ToList();

    // with page and limit, cut the list
    if (page > 0 && limit > 0)
    {
      int offset = (page - 1) * limit;
      requests = requests.Skip(offset).Take(limit).ToList();
    }

    List<RequestDTO> result = new();

    foreach (Request task in requests)
    {
      if (await svReqRepo.GetByIdAsync(task.Id) != null)
        result.Add(await mapper.ToDto(task, "SurveillanceRequestDTO"));

      if (await pdReqRepo.GetByIdAsync(task.Id) != null)
        result.Add(await mapper.ToDto(task, "PickAndDeliveryRequestDTO"));
    }

    return new PaginationDTO<RequestDTO>(result, page, limit, requests.Count);
  }
}
