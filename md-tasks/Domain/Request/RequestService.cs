using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DDDSample1.Domain.DeviceTasks.PickAndDeliveryTasks;
using DDDSample1.Domain.DeviceTasks.SurveillanceTasks;
using DDDSample1.Domain.DTO;
using DDDSample1.Domain.Floor;
using DDDSample1.Domain.Room;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.User;

namespace DDDSample1.Domain.DeviceTasks
{
  public class RequestService
  {
    private readonly IUnitOfWork unitOfWork;
    private readonly ISurveillanceRequestRepository surveillanceTaskRepository;
    private readonly IPickAndDeliveryRequestRepository pickAndDeliveryTaskRepository;

    public RequestService(IUnitOfWork unitOfWork, ISurveillanceRequestRepository surveillanceTaskRepository, IPickAndDeliveryRequestRepository pickAndDeliveryTaskRepository)
    {
      this.unitOfWork = unitOfWork;
      this.surveillanceTaskRepository = surveillanceTaskRepository;
      this.pickAndDeliveryTaskRepository = pickAndDeliveryTaskRepository;
    }

    public async Task<PaginationDTO<RequestDTO>> GetAllAsync(int page, int limit)
    {
      List<Request> surTasks = (await surveillanceTaskRepository.GetAllAsync(page - 1, limit)).Cast<Request>().ToList();
      List<Request> pickTasks = (await pickAndDeliveryTaskRepository.GetAllAsync(page - 1, limit)).Cast<Request>().ToList();

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
          result.Add(await ConvertToDTO(task, "SurveillanceRequestDTO"));

        if (await pickAndDeliveryTaskRepository.GetByIdAsync(task.Id) != null)
          result.Add(await ConvertToDTO(task, "PickAndDeliveryRequestDTO"));
      }

      return new PaginationDTO<RequestDTO>(result, page, limit, await surveillanceTaskRepository.CountAsync() + await pickAndDeliveryTaskRepository.CountAsync());
    }

    public async Task<RequestDTO> GetByIdAsync(RequestId id)
    {
      Request req = await surveillanceTaskRepository.GetByIdAsync(id);

      if (req != null)
        return await ConvertToDTO(req, "SurveillanceRequestDTO");

      req = await pickAndDeliveryTaskRepository.GetByIdAsync(id);
      if (req != null)
        return await ConvertToDTO(req, "PickAndDeliveryRequestDTO");

      return null;
    }

    public async Task<RequestDTO> AddSurveillanceTask(SurveillanceRequestDTO dto)
    {
      try
      {
        SurveillanceRequest t = new(new RequestId(Guid.NewGuid().ToString()), new RequestDescription(dto.Description), new UserName(dto.UserName), new UserPhoneNumber(dto.PhoneNumber), new FloorId(dto.FloorId), dto.StartCoordinateX, dto.StartCoordinateY, dto.EndCoordinateX, dto.EndCoordinateY, new UserId(dto.UserId));
        await surveillanceTaskRepository.AddAsync(t);
        await unitOfWork.CommitAsync();

        return await ConvertToDTO(t, "SurveillanceRequestDTO");
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

        return await ConvertToDTO(t, "PickAndDeliveryRequestDTO");
      }
      catch (Exception e)
      {
        Console.WriteLine($"Exception: {e.Message}");
        throw;
      }
    }

    public async Task<RequestDto> UpdateAsync(RequestDTO dto)
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

    public async Task<RequestDto> InactivateAsync(RequestId id)
    {
      RequestDto task = null;
      // var task = await repo.GetByIdAsync(id);

      if (task == null)
        return null;

      // change all fields
      // ...

      await this.unitOfWork.CommitAsync();

      return new RequestDto { Id = task.Id };
    }

    public async Task<RequestDto> DeleteAsync(RequestId id)
    {
      RequestDto task = null;
      // var task = await repo.GetByIdAsync(id);

      if (task == null)
        return null;

      // if (task.Active)
      //   throw new BusinessRuleValidationException("It is not possible to delete an active task.");

      // repo.Remove(task);
      await unitOfWork.CommitAsync();

      return new RequestDto { Id = task.Id };
    }

    private async Task<RequestDTO> ConvertToDTO(Request t, string type)
    {
      if (type.Equals("SurveillanceRequestDTO"))
      {
        SurveillanceRequest task = await surveillanceTaskRepository.GetByIdAsync(t.Id);
        return new SurveillanceRequestDTO(
            t.Id.Value,
            task.Description.Value,
            task.UserName.Name,
            task.UserPhoneNumber.PhoneNumber,
            task.FloorId.Value,
            task.StartCoordinateX,
            task.StartCoordinateY,
            task.EndCoordinateX,
            task.EndCoordinateY,
            t.UserId.Value,
            task.State.State.ToString(),
            t.RequestedAt.ToString()
        );
      }

      if (type.Equals("PickAndDeliveryRequestDTO"))
      {
        PickAndDeliveryRequest task = await pickAndDeliveryTaskRepository.GetByIdAsync(t.Id);

        return new PickAndDeliveryRequestDTO(
            t.Id.Value,
            task.Description.Value,
            task.PickupUserName.Name,
            task.DeliveryUserName.Name,
            task.PickupUserPhoneNumber.PhoneNumber,
            task.DeliveryUserPhoneNumber.PhoneNumber,
            task.PickupRoomId.Value,
            task.DeliveryRoomId.Value,
            task.ConfirmationCode.Code,
            task.StartCoordinateX,
            task.StartCoordinateY,
            task.EndCoordinateX,
            task.EndCoordinateY,
            task.StartFloorCode,
            task.EndFloorCode,
            t.UserId.Value,
            task.State.State.ToString(),
            t.RequestedAt.ToString()
        );
      }

      return null;
    }
  }
}
