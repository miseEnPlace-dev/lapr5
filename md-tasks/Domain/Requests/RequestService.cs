using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MDTasks.Domain.DTO;
using MDTasks.Domain.Floor;
using MDTasks.Domain.Room;
using MDTasks.Domain.Shared;
using MDTasks.Domain.User;
using MDTasks.Mappers;
using MDTasks.Repositories;
using MDTasks.Services;

namespace MDTasks.Domain.Requests;

public class RequestService : IRequestService
{
  private readonly IUnitOfWork unitOfWork;
  private readonly ISurveillanceRequestRepository svReqRepo;
  private readonly IPickAndDeliveryRequestRepository pdReqRepo;

  public RequestService(IUnitOfWork unitOfWork, ISurveillanceRequestRepository svReqRepo, IPickAndDeliveryRequestRepository pdReqRepo)
  {
    this.unitOfWork = unitOfWork;
    this.svReqRepo = svReqRepo;
    this.pdReqRepo = pdReqRepo;
  }

  public async Task<PaginationDTO<RequestDTO>> GetAll(int page, int limit)
  {
    List<Request> surTasks = (await svReqRepo.GetAllAsync(-1, -1)).Cast<Request>().ToList();
    List<Request> pickTasks = (await pdReqRepo.GetAllAsync(-1, -1)).Cast<Request>().ToList();

    List<Request> tasks = new();
    tasks.AddRange(surTasks);
    tasks.AddRange(pickTasks);

    // with page and limit, cut the list
    if (page > 0 && limit > 0)
    {
      int offset = (page - 1) * limit;
      tasks = tasks.Skip(offset).Take(limit).ToList();
    }

    List<RequestDTO> result = new();

    foreach (Request task in tasks)
    {
      if (await svReqRepo.GetByIdAsync(task.Id) != null)
        result.Add(SurveillanceRequestMapper.ToDTO((SurveillanceRequest)task));

      if (await pdReqRepo.GetByIdAsync(task.Id) != null)
        result.Add(PickAndDeliveryRequestMapper.ToDTO((PickAndDeliveryRequest)task));
    }

    return new PaginationDTO<RequestDTO>(result, page, limit, await svReqRepo.CountAsync() + await pdReqRepo.CountAsync());
  }

  public async Task<PaginationDTO<RequestDTO>> GetAllSurveillance(int page, int limit)
  {
    List<Request> surTasks = (await svReqRepo.GetAllAsync(-1, -1)).Cast<Request>().ToList();

    List<Request> tasks = new();
    tasks.AddRange(surTasks);

    // with page and limit, cut the list
    if (page > 0 && limit > 0)
    {
      int offset = (page - 1) * limit;
      tasks = tasks.Skip(offset).Take(limit).ToList();
    }

    List<RequestDTO> result = new();

    foreach (Request task in tasks)
    {
      if (await svReqRepo.GetByIdAsync(task.Id) != null)
        result.Add(SurveillanceRequestMapper.ToDTO((SurveillanceRequest)task));

      if (await pdReqRepo.GetByIdAsync(task.Id) != null)
        result.Add(PickAndDeliveryRequestMapper.ToDTO((PickAndDeliveryRequest)task));
    }

    return new PaginationDTO<RequestDTO>(result, page, limit, await svReqRepo.CountAsync() + await pdReqRepo.CountAsync());
  }

  public async Task<PaginationDTO<RequestDTO>> GetAllPickAndDelivery(int page, int limit)
  {
    List<Request> pdTasks = (await pdReqRepo.GetAllAsync(-1, -1)).Cast<Request>().ToList();

    List<Request> tasks = new();
    tasks.AddRange(pdTasks);

    // with page and limit, cut the list
    if (page > 0 && limit > 0)
    {
      int offset = (page - 1) * limit;
      tasks = tasks.Skip(offset).Take(limit).ToList();
    }

    List<RequestDTO> result = new();

    foreach (Request task in tasks)
    {
      if (await svReqRepo.GetByIdAsync(task.Id) != null)
        result.Add(SurveillanceRequestMapper.ToDTO((SurveillanceRequest)task));

      if (await pdReqRepo.GetByIdAsync(task.Id) != null)
        result.Add(PickAndDeliveryRequestMapper.ToDTO((PickAndDeliveryRequest)task));
    }

    return new PaginationDTO<RequestDTO>(result, page, limit, await svReqRepo.CountAsync() + await pdReqRepo.CountAsync());
  }

  public async Task<PaginationDTO<RequestDTO>> GetByState(RequestState state, int page, int limit)
  {
    List<SurveillanceRequest> sv = await svReqRepo.GetRequestsByState(state, page - 1, limit);
    List<PickAndDeliveryRequest> pd = await pdReqRepo.GetRequestsByState(state, page - 1, limit);

    List<RequestDTO> requests = new();

    foreach (SurveillanceRequest s in sv)
      requests.Add(SurveillanceRequestMapper.ToDTO(s));
    foreach (PickAndDeliveryRequest p in pd)
      requests.Add(PickAndDeliveryRequestMapper.ToDTO(p));

    return new PaginationDTO<RequestDTO>(requests, page, limit, await svReqRepo.CountAsync() + await pdReqRepo.CountAsync());
  }

  public async Task<RequestDTO> GetById(RequestId id)
  {
    SurveillanceRequest svReq = await svReqRepo.GetByIdAsync(id);
    if (svReq != null) return SurveillanceRequestMapper.ToDTO(svReq);

    PickAndDeliveryRequest pdReq = await pdReqRepo.GetByIdAsync(id);
    if (pdReq != null) return PickAndDeliveryRequestMapper.ToDTO(pdReq);

    return null;
  }

  public async Task<RequestDTO> AddSurveillanceRequest(SurveillanceRequestDTO dto)
  {
    try
    {
      SurveillanceRequest t = new(new RequestId(Guid.NewGuid().ToString()), new RequestDescription(dto.Description), new UserName(dto.UserName), new UserPhoneNumber(dto.PhoneNumber), new FloorId(dto.FloorId), dto.StartCoordinateX, dto.StartCoordinateY, dto.EndCoordinateX, dto.EndCoordinateY, new UserId(dto.UserId));
      await svReqRepo.AddAsync(t);
      await unitOfWork.CommitAsync();

      return SurveillanceRequestMapper.ToDTO(t);
    }
    catch (Exception e)
    {
      Console.WriteLine($"Exception: {e.Message}");
      throw;
    }
  }

  public async Task<RequestDTO> AddPickAndDeliveryRequest(PickAndDeliveryRequestDTO dto)
  {
    try
    {
      PickAndDeliveryRequest t = new(new RequestId(Guid.NewGuid().ToString()), new RequestDescription(dto.Description), new UserName(dto.PickupUserName), new UserName(dto.DeliveryUserName), new UserPhoneNumber(dto.PickupUserPhoneNumber), new UserPhoneNumber(dto.DeliveryUserPhoneNumber), new RoomId(dto.PickupRoomId), new RoomId(dto.DeliveryRoomId), new ConfirmationCode(dto.ConfirmationCode), dto.StartCoordinateX, dto.StartCoordinateY, dto.EndCoordinateX, dto.EndCoordinateY, dto.StartFloorCode, dto.EndFloorCode, new UserId(dto.UserId));
      await pdReqRepo.AddAsync(t);
      await unitOfWork.CommitAsync();

      return PickAndDeliveryRequestMapper.ToDTO(t);
    }
    catch (Exception e)
    {
      Console.WriteLine($"Exception: {e.Message}");
      throw;
    }
  }

  public async Task<RequestDTO> Update(RequestDTO dto)
  {
    RequestDTO request = null;
    // var task = await repo.GetByIdAsync(new DeviceTaskId(dto.Id));

    if (request == null)
      return null;

    // change all fields
    // ...

    await this.unitOfWork.CommitAsync();

    return null;
  }

  public async Task<RequestDTO> InactivateAsync(RequestId id)
  {
    RequestDTO request = null;
    // var task = await repo.GetByIdAsync(id);

    if (request == null)
      return null;

    // change all fields
    // ...

    await this.unitOfWork.CommitAsync();

    // return new RequestDTO { Id = task.Id };
    return null;
  }

  public async Task<RequestDTO> Delete(RequestId id)
  {
    RequestDTO task = null;
    // var task = await repo.GetByIdAsync(id);

    if (task == null)
      return null;

    // if (task.Active)
    //   throw new BusinessRuleValidationException("It is not possible to delete an active task.");

    // repo.Remove(task);
    await unitOfWork.CommitAsync();

    // return new RequestDTO { Id = task.Id };
    return null;
  }

  public async Task<RequestDTO> AcceptRequest(RequestId id)
  {
    SurveillanceRequest svReq = await svReqRepo.GetByIdAsync(id);
    if (svReq != null)
    {
      svReq.State.ChangeState(StateEnum.Accepted);
      await unitOfWork.CommitAsync();
      return SurveillanceRequestMapper.ToDTO(svReq);
    }

    PickAndDeliveryRequest pdReq = await pdReqRepo.GetByIdAsync(id);
    if (pdReq != null)
    {
      pdReq.State.ChangeState(StateEnum.Accepted);
      await unitOfWork.CommitAsync();
      return PickAndDeliveryRequestMapper.ToDTO(pdReq);
    }

    return null;
  }

  public async Task<RequestDTO> RejectRequest(RequestId id)
  {
    SurveillanceRequest svReq = await svReqRepo.GetByIdAsync(id);
    if (svReq != null)
    {
      svReq.State.ChangeState(StateEnum.Rejected);
      await unitOfWork.CommitAsync();
      return SurveillanceRequestMapper.ToDTO(svReq);
    }

    PickAndDeliveryRequest pdReq = await pdReqRepo.GetByIdAsync(id);
    if (pdReq != null)
    {
      pdReq.State.ChangeState(StateEnum.Rejected);
      await unitOfWork.CommitAsync();
      return PickAndDeliveryRequestMapper.ToDTO(pdReq);
    }

    return null;
  }
}
