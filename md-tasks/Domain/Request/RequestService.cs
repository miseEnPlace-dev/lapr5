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
  private readonly ISurveillanceRequestRepository surveillanceTaskRepository;
  private readonly IPickAndDeliveryRequestRepository pickAndDeliveryTaskRepository;
  private readonly RequestMapper mapper;

  private readonly ITaskRepository taskRepository;

  public RequestService(IUnitOfWork unitOfWork, ISurveillanceRequestRepository surveillanceTaskRepository, IPickAndDeliveryRequestRepository pickAndDeliveryTaskRepository, ITaskRepository taskRepository)
  {
    this.unitOfWork = unitOfWork;
    this.surveillanceTaskRepository = surveillanceTaskRepository;
    this.pickAndDeliveryTaskRepository = pickAndDeliveryTaskRepository;
    this.taskRepository = taskRepository;
    mapper = new RequestMapper(surveillanceTaskRepository, pickAndDeliveryTaskRepository);
  }

  public async Task<PaginationDTO<RequestDTO>> GetAllAsync(int page, int limit)
  {
    List<Request> surTasks = (await surveillanceTaskRepository.GetAllOrderedByRequestedAt(-1, -1)).Cast<Request>().ToList();
    List<Request> pickTasks = (await pickAndDeliveryTaskRepository.GetAllOrderedByRequestedAt(-1, -1)).Cast<Request>().ToList();

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
      if (await surveillanceTaskRepository.GetByIdAsync(task.Id) != null)
        result.Add(await mapper.ToDto(task, "SurveillanceRequestDTO"));

      if (await pickAndDeliveryTaskRepository.GetByIdAsync(task.Id) != null)
        result.Add(await mapper.ToDto(task, "PickAndDeliveryRequestDTO"));
    }

    return new PaginationDTO<RequestDTO>(result, page, limit, await surveillanceTaskRepository.CountAsync() + await pickAndDeliveryTaskRepository.CountAsync());
  }

  public async Task<PaginationDTO<RequestDTO>> GetRequestsByUserIdAsync(UserId id, int page, int limit)
  {
    List<Request> surTasks = (await surveillanceTaskRepository.GetRequestsByUserIdAsync(id, -1, -1)).Cast<Request>().ToList();
    List<Request> pickTasks = (await pickAndDeliveryTaskRepository.GetRequestsByUserIdAsync(id, -1, -1)).Cast<Request>().ToList();

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
      if (await surveillanceTaskRepository.GetByIdAsync(task.Id) != null)
        result.Add(await mapper.ToDto(task, "SurveillanceRequestDTO"));

      if (await pickAndDeliveryTaskRepository.GetByIdAsync(task.Id) != null)
        result.Add(await mapper.ToDto(task, "PickAndDeliveryRequestDTO"));
    }

    return new PaginationDTO<RequestDTO>(result, page, limit, surTasks.Count + pickTasks.Count);
  }

  public async Task<PaginationDTO<RequestDTO>> GetAllSurveillanceAsync(int page, int limit)
  {
    List<Request> surTasks = (await surveillanceTaskRepository.GetAllAsync(page - 1, limit)).Cast<Request>().ToList();

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
      result.Add(await mapper.ToDto(task, "SurveillanceRequestDTO"));

      if (await pickAndDeliveryTaskRepository.GetByIdAsync(task.Id) != null)
        result.Add(await mapper.ToDto(task, "PickAndDeliveryRequestDTO"));
    }

    return new PaginationDTO<RequestDTO>(result, page, limit, await surveillanceTaskRepository.CountAsync() + await pickAndDeliveryTaskRepository.CountAsync());
  }

  public async Task<PaginationDTO<RequestDTO>> GetAllPickDeliveryAsync(int page, int limit)
  {
    List<Request> pickTasks = (await pickAndDeliveryTaskRepository.GetAllAsync(page - 1, limit)).Cast<Request>().ToList();

    List<Request> tasks = new();
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
      result.Add(await mapper.ToDto(task, "PickAndDeliveryRequestDTO"));
    }

    return new PaginationDTO<RequestDTO>(result, page, limit, await pickAndDeliveryTaskRepository.CountAsync());
  }

  public async Task<RequestDTO> GetByIdAsync(RequestId id)
  {
    Request req = await surveillanceTaskRepository.GetByIdAsync(id);

    if (req != null)
      return await mapper.ToDto(req, "SurveillanceRequestDTO");

    req = await pickAndDeliveryTaskRepository.GetByIdAsync(id);
    if (req != null)
      return await mapper.ToDto(req, "PickAndDeliveryRequestDTO");

    return null;
  }

  public async Task<RequestDTO> AddSurveillanceTask(SurveillanceRequestDTO dto)
  {
    try
    {
      SurveillanceRequest t = new(new RequestId(Guid.NewGuid().ToString()), new RequestDescription(dto.Description), new UserName(dto.UserName), new UserPhoneNumber(dto.PhoneNumber), new FloorId(dto.FloorId), dto.StartCoordinateX, dto.StartCoordinateY, dto.EndCoordinateX, dto.EndCoordinateY, new UserId(dto.UserId));
      await surveillanceTaskRepository.AddAsync(t);
      await unitOfWork.CommitAsync();

      return await mapper.ToDto(t, "SurveillanceRequestDTO");
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
      PickAndDeliveryRequest t = new(new RequestId(Guid.NewGuid().ToString()), new RequestDescription(dto.Description), new UserName(dto.PickupUserName), new UserName(dto.DeliveryUserName), new UserPhoneNumber(dto.PickupUserPhoneNumber), new UserPhoneNumber(dto.DeliveryUserPhoneNumber), new RoomId(dto.PickupRoomId), new RoomId(dto.DeliveryRoomId), new ConfirmationCode(dto.ConfirmationCode), dto.StartCoordinateX, dto.StartCoordinateY, dto.EndCoordinateX, dto.EndCoordinateY, dto.StartFloorCode, dto.EndFloorCode, new UserId(dto.UserId));
      await pickAndDeliveryTaskRepository.AddAsync(t);
      await unitOfWork.CommitAsync();

      return await mapper.ToDto(t, "PickAndDeliveryRequestDTO");
    }
    catch (Exception e)
    {
      Console.WriteLine($"Exception: {e.Message}");
      throw;
    }
  }

  public async Task<RequestDTO> UpdateAsync(RequestDTO dto)
  {
    RequestDTO task = null;
    // var task = await repo.GetByIdAsync(new DeviceTaskId(dto.Id));

    if (task == null)
      return null;

    // change all fields
    // ...

    await this.unitOfWork.CommitAsync();

    return null;
  }

  public async Task<RequestDTO> InactivateAsync(RequestId id)
  {
    RequestDTO task = null;
    // var task = await repo.GetByIdAsync(id);

    if (task == null)
      return null;

    // change all fields
    // ...

    await this.unitOfWork.CommitAsync();

    return null;
  }

  public async Task<RequestDTO> DeleteAsync(RequestId id)
  {
    RequestDTO task = null;
    // var task = await repo.GetByIdAsync(id);

    if (task == null)
      return null;

    // if (task.Active)
    //   throw new BusinessRuleValidationException("It is not possible to delete an active task.");

    // repo.Remove(task);
    await unitOfWork.CommitAsync();

    return null;
  }



  public async Task<RequestDTO> AcceptRequest(RequestId id, TaskDTO taskDTO)
  {
    SurveillanceRequest sv = await surveillanceTaskRepository.GetByIdAsync(id);

    if (sv != null)
    {
      sv.ChangeState(StateEnum.Accepted);
      await unitOfWork.CommitAsync();

      DeviceTask t = new(id, taskDTO.DeviceId);
      await taskRepository.AddAsync(t);
      await unitOfWork.CommitAsync();
      return await mapper.ToDto(sv, "SurveillanceRequestDTO");
    }

    PickAndDeliveryRequest pd = await pickAndDeliveryTaskRepository.GetByIdAsync(id);
    if (pd != null)
    {
      pd.ChangeState(StateEnum.Accepted);
      await unitOfWork.CommitAsync();

      DeviceTask t = new(id, taskDTO.DeviceId);
      await taskRepository.AddAsync(t);
      await unitOfWork.CommitAsync();
      return await mapper.ToDto(pd, "PickAndDeliveryRequestDTO");
    }

    return null;
  }

  public async Task<RequestDTO> RejectRequest(RequestId id)
  {
    SurveillanceRequest sv = await surveillanceTaskRepository.GetByIdAsync(id);

    if (sv != null)
    {
      sv.ChangeState(StateEnum.Rejected);
      await unitOfWork.CommitAsync();
      return await mapper.ToDto(sv, "SurveillanceRequestDTO");
    }

    PickAndDeliveryRequest pd = await pickAndDeliveryTaskRepository.GetByIdAsync(id);
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
    List<Request> sv = (await surveillanceTaskRepository.GetRequestsByState(state, -1, -1)).Cast<Request>().ToList();
    List<Request> pd = (await pickAndDeliveryTaskRepository.GetRequestsByState(state, -1, -1)).Cast<Request>().ToList();

    List<Request> requests = new();
    requests.AddRange(sv);
    requests.AddRange(pd);

    // with page and limit, cut the list
    if (page > 0 && limit > 0)
    {
      int offset = (page - 1) * limit;
      requests = requests.Skip(offset).Take(limit).ToList();
    }

    List<RequestDTO> result = new();

    foreach (Request task in requests)
    {
      if (await surveillanceTaskRepository.GetByIdAsync(task.Id) != null)
        result.Add(await mapper.ToDto(task, "SurveillanceRequestDTO"));

      if (await pickAndDeliveryTaskRepository.GetByIdAsync(task.Id) != null)
        result.Add(await mapper.ToDto(task, "PickAndDeliveryRequestDTO"));
    }

    return new PaginationDTO<RequestDTO>(result, page, limit, requests.Count);
  }
}
