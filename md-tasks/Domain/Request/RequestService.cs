using System;
using System.Collections.Generic;
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
  public class RequestService
  {
    private readonly IUnitOfWork _unitOfWork;
    private readonly IRequestRepository _repo;
    private readonly ISurveillanceTaskRepository _surveillanceTaskRepository;

    private readonly IPickAndDeliveryTaskRepository _pickAndDeliveryTaskRepository;

    public RequestService(IUnitOfWork unitOfWork, IRequestRepository repo, ISurveillanceTaskRepository surveillanceTaskRepository, IPickAndDeliveryTaskRepository pickAndDeliveryTaskRepository)
    {
      _unitOfWork = unitOfWork;
      _repo = repo;
      _surveillanceTaskRepository = surveillanceTaskRepository;
      _pickAndDeliveryTaskRepository = pickAndDeliveryTaskRepository;
    }

    public async Task<List<RequestDTO>> GetAllAsync()
    {
      List<Request> list = await _repo.GetAllAsync();

      List<RequestDTO> listDto = new();

      foreach (Request r in list)
      {
        if (await _surveillanceTaskRepository.GetByIdAsync(r.DeviceTaskId) != null)
        {
          listDto.Add(await ConvertToDTO(r, "SurveillanceRequestDTO"));
        }
        else if (await _pickAndDeliveryTaskRepository.GetByIdAsync(r.DeviceTaskId) != null)
        {
          listDto.Add(await ConvertToDTO(r, "PickDeliveryRequestDTO"));
        }
      }

      return listDto;
    }

    public async Task<List<SurveillanceRequestDTO>> GetAllSurveillanceAsync()
    {
      List<Request> list = await _repo.GetSurveillanceRequests();

      List<SurveillanceRequestDTO> listDto = new();

      foreach (Request r in list)
      {
        SurveillanceTask task = await _surveillanceTaskRepository.GetByIdAsync(new DeviceTaskId(r.DeviceTaskId.ToString()));
        SurveillanceRequestDTO dto = new(r.UserId.ToString(), r.RequestedAt.ToString(), task.UserName.Name, task.UserPhoneNumber.PhoneNumber, task.FloorId.Value);
        listDto.Add(dto);
      }

      return listDto;
    }

    public async Task<List<RequestDTO>> GetRequestsByState(string state)
    {
      List<Request> list = await _repo.GetRequestsByState(state);

      List<RequestDTO> listDto = new();

      foreach (Request r in list)
      {
        if (await _surveillanceTaskRepository.GetByIdAsync(r.DeviceTaskId) != null)
        {
          listDto.Add(await ConvertToDTO(r, "SurveillanceRequestDTO"));
          continue;
        }

        if (await _pickAndDeliveryTaskRepository.GetByIdAsync(r.DeviceTaskId) != null)
          listDto.Add(await ConvertToDTO(r, "PickDeliveryRequestDTO"));
      }

      return listDto;
    }

    public async Task<List<RequestDTO>> GetRequestsByUserId(string userId)
    {
      List<Request> list = await _repo.GetRequestsByUserId(userId);

      List<RequestDTO> listDto = new();

      foreach (Request r in list)
      {
        if (await _surveillanceTaskRepository.GetByIdAsync(r.DeviceTaskId) != null)
        {
          listDto.Add(await ConvertToDTO(r, "SurveillanceRequestDTO"));
          continue;
        }

        if (await _pickAndDeliveryTaskRepository.GetByIdAsync(r.DeviceTaskId) != null)
          listDto.Add(await ConvertToDTO(r, "PickDeliveryRequestDTO"));
      }

      return listDto;
    }

    public async Task<RequestDTO> GetByIdAsync(RequestId id)
    {
      Request r = await _repo.GetByIdAsync(id);
      if (r == null) return null;

      if (await _surveillanceTaskRepository.GetByIdAsync(r.DeviceTaskId) != null)
        return await ConvertToDTO(r, "SurveillanceRequestDTO");


      if (await _pickAndDeliveryTaskRepository.GetByIdAsync(r.DeviceTaskId) != null)
        return await ConvertToDTO(r, "PickDeliveryRequestDTO");

      return null;
    }

    public async Task<RequestDTO> AddAsyncSurveillanceRequest(SurveillanceRequestDTO dto)
    {
      try
      {
        Guard.AgainstNullBulk("Invalid Request", dto.UserId == null || dto.Description == null || dto.UserName == null || dto.PhoneNumber == null || dto.FloorId == null);

        SurveillanceTask task = new(new DeviceTaskId(Guid.NewGuid().ToString()), new TaskDescription(dto.Description), new UserName(dto.UserName), new UserPhoneNumber(dto.PhoneNumber), new FloorId(dto.FloorId));
        await _surveillanceTaskRepository.AddAsync(task);
        await _unitOfWork.CommitAsync();

        Request r = new(new UserId(dto.UserId), task.Id);
        await _repo.AddAsync(r);
        await _unitOfWork.CommitAsync();

        return await ConvertToDTO(r, dto.GetType().Name);
      }
      catch (Exception e)
      {
        Console.WriteLine($"Exception: {e.Message}");
        throw;
      }
    }

    public async Task<RequestDTO> AddAsyncPickAndDeliveryRequest(PickDeliveryRequestDTO dto)
    {
      try
      {
        Guard.AgainstNullBulk("cannot be null.", dto.UserId, dto.Description, dto.PickupUserName, dto.DeliveryUserName, dto.PickupRoomId, dto.DeliveryRoomId, dto.PickupUserPhoneNumber, dto.DeliveryUserPhoneNumber, dto.ConfirmationCode);

        PickAndDeliveryTask task = new(new DeviceTaskId(Guid.NewGuid().ToString()), new TaskDescription(dto.Description),
        new UserName(dto.PickupUserName), new(dto.DeliveryUserName),
        new UserPhoneNumber(dto.PickupUserPhoneNumber), new UserPhoneNumber(dto.DeliveryUserPhoneNumber),
        new RoomId(dto.PickupRoomId), new RoomId(dto.DeliveryRoomId), new ConfirmationCode(dto.ConfirmationCode));

        await _pickAndDeliveryTaskRepository.AddAsync(task);
        await _unitOfWork.CommitAsync();

        Request r = new(new UserId(dto.UserId), task.Id);
        await _repo.AddAsync(r);
        await _unitOfWork.CommitAsync();

        return await ConvertToDTO(r, dto.GetType().Name);
      }
      catch (Exception e)
      {
        Console.WriteLine($"Exception: {e.Message}");
        throw;
      }
    }

    public async Task<RequestDTO> UpdateAsync(RequestDTO dto)
    {
      Request r = await _repo.GetByIdAsync(new RequestId(dto.Id));
      if (r == null) return null;

      // update fields
      r.ChangeState(new RequestState(dto.State));

      await _unitOfWork.CommitAsync();

      return await ConvertToDTO(r, dto.GetType().Name);
    }

    public async Task<RequestDTO> PutAsync(RequestDTO dto)
    {
      Request r = await _repo.GetByIdAsync(new RequestId(dto.Id));
      if (r == null) return null;

      // update fields
      r.ChangeState(new RequestState(dto.State));

      await _unitOfWork.CommitAsync();
      return await ConvertToDTO(r, dto.GetType().Name);
    }

    public async Task<RequestDTO> DeleteAsync(RequestId id)
    {
      Request r = await _repo.GetByIdAsync(id);
      if (r == null) return null;

      _repo.Remove(r);
      await _unitOfWork.CommitAsync();

      return null;
    }

    private async Task<RequestDTO> ConvertToDTO(Request r, string type)
    {
      if (type.Equals("SurveillanceRequestDTO"))
      {
        SurveillanceTask task = await _surveillanceTaskRepository.GetByIdAsync(r.DeviceTaskId);
        return new SurveillanceRequestDTO(
            r.Id.Value,
            r.UserId.Value,
            task.Description.Value,
            r.RequestedAt.ToString(),
            StateEnum.Pending,
            task.UserName.Name,
            task.UserPhoneNumber.PhoneNumber,
            task.FloorId.Value,
            task.Id.Value
        );
      }

      if (type.Equals("PickDeliveryRequestDTO"))
      {
        PickAndDeliveryTask task = await _pickAndDeliveryTaskRepository.GetByIdAsync(r.DeviceTaskId);
        return new PickDeliveryRequestDTO(
            r.Id.Value,
            r.UserId.Value,
            task.Description.Value,
            r.RequestedAt.ToString(),
            StateEnum.Pending,
            task.PickupUserName.Name,
            task.DeliveryUserName.Name,
            task.PickupUserPhoneNumber.PhoneNumber,
            task.DeliveryUserPhoneNumber.PhoneNumber,
            task.PickupRoomId.Value,
            task.DeliveryRoomId.Value,
            task.Id.Value,
            task.ConfirmationCode.Code
        );
      }

      return null;
    }
  }
}
