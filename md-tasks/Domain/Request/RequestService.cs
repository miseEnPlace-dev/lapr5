using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DDDSample1.Domain.DeviceTasks;
using DDDSample1.Domain.DeviceTasks.PickAndDeliveryTask;
using DDDSample1.Domain.DeviceTasks.SurveillanceTask;
using DDDSample1.Domain.DTO;
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

    public RequestService(IUnitOfWork unitOfWork, IRequestRepository repo)
    {
      _unitOfWork = unitOfWork;
      _repo = repo;
    }

    public async Task<List<IRequestDTO>> GetAllAsync()
    {
      List<Request> list = await _repo.GetAllAsync();

      List<IRequestDTO> listDto = new();
      //list = list.ConvertAll(r => new RequestDTO(r.));
      return listDto;
    }

    public async Task<List<SurveillanceRequestDTO>> GetAllSurveillanceAsync()
    {
      List<Request> list = await _repo.GetSurveillanceRequests();

      List<SurveillanceRequestDTO> listDto = new();

      foreach (Request r in list)
      {
        SurveillanceTask task = await _surveillanceTaskRepository.GetByIdAsync(new DeviceTaskId(r.DeviceTaskId.ToString()));
        SurveillanceRequestDTO dto = new(r.UserId.ToString(), r.RequestedAt.ToString(), task.UserContact.ToString(), task.FloorId.ToString(), r.DeviceTaskId.ToString());
        listDto.Add(dto);
      }

      return listDto;
    }

    public async Task<List<IRequestDTO>> GetRequestsByState(string state)
    {
      List<Request> list = await _repo.GetRequestsByState(state);

      List<IRequestDTO> listDto = new();
      return listDto;
    }

    public async Task<IRequestDTO> GetByIdAsync(RequestId id)
    {
      Request r = await _repo.GetByIdAsync(id);
      if (r == null) return null;

      return null;
    }

    public async Task<RequestDTO> AddAsync(RequestDTO dto)
    {
      Request r = new(new UserId(dto.UserId), new DeviceTaskId(dto.DeviceTaskId));
      await _repo.AddAsync(r);
      await _unitOfWork.CommitAsync();

      return await ConvertToDTO(dto);
    }

    public async Task<RequestDTO> UpdateAsync(RequestDTO dto)
    {
      Request r = await _repo.GetByIdAsync(new RequestId(dto.Id));
      if (r == null) return null;

      // update fields
      r.ChangeState(new RequestState(dto.State));

      await _unitOfWork.CommitAsync();

      return await ConvertToDTO(dto);
    }

    public async Task<RequestDTO> PutAsync(RequestDTO dto)
    {
      Request r = await _repo.GetByIdAsync(new RequestId(dto.Id));
      if (r == null) return null;

      // update fields
      r.ChangeState(new RequestState(dto.State));

      await _unitOfWork.CommitAsync();
      return await ConvertToDTO(dto);
    }

    public async Task<IRequestDTO> DeleteAsync(RequestId id)
    {
      Request r = await _repo.GetByIdAsync(id);
      if (r == null) return null;

      _repo.Remove(r);
      await _unitOfWork.CommitAsync();

      return null;
    }

    private async Task<RequestDTO> ConvertToDTO(RequestDTO r)
    {
      if (r is ISurveillanceRequestDTO surveillanceReq)
      {
        SurveillanceTask task = await _surveillanceTaskRepository.GetByIdAsync(new DeviceTaskId(surveillanceReq.DeviceTaskId.ToString()));
        SurveillanceRequestDTO dto = new(r.UserId.ToString(), r.RequestedAt.ToString(), task.UserContact.ToString(), task.FloorId.ToString(), r.DeviceTaskId.ToString());
        return dto;
      }
      else if (r is IPickDeliveryRequestDTO pickDeliveryTask)
      {
        PickAndDeliveryTask task = await _pickAndDeliveryTaskRepository.GetByIdAsync(new DeviceTaskId(pickDeliveryTask.DeviceTaskId.ToString()));
        PickDeliveryRequestDTO dto = new(r.UserId.ToString(), r.RequestedAt.ToString(), task.Description.ToString(), task.PickupUserId.ToString(), task.DeliveryUserId.ToString(), task.PickupRoomId.ToString(), task.DeliveryRoomId.ToString(), task.ConfirmationCode.ToString(), r.DeviceTaskId.ToString());
        return dto;
      }

      return null;
    }
  }
}
