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
  public class DeviceTaskService
  {
    private readonly IUnitOfWork unitOfWork;
    private readonly ISurveillanceTaskRepository surveillanceTaskRepository;
    private readonly IPickAndDeliveryTaskRepository pickAndDeliveryTaskRepository;

    public DeviceTaskService(IUnitOfWork unitOfWork, ISurveillanceTaskRepository surveillanceTaskRepository, IPickAndDeliveryTaskRepository pickAndDeliveryTaskRepository)
    {
      this.unitOfWork = unitOfWork;
      this.surveillanceTaskRepository = surveillanceTaskRepository;
      this.pickAndDeliveryTaskRepository = pickAndDeliveryTaskRepository;
    }

    public async Task<List<TaskDTO>> GetAllAsync()
    {
      List<DeviceTask> surTasks = (await surveillanceTaskRepository.GetAllAsync(-1, -1)).Cast<DeviceTask>().ToList();
      List<DeviceTask> pickTasks = (await pickAndDeliveryTaskRepository.GetAllAsync(-1, -1)).Cast<DeviceTask>().ToList();

      List<DeviceTask> tasks = new();
      tasks.AddRange(surTasks);
      tasks.AddRange(pickTasks);

      List<TaskDTO> result = new();

      foreach (DeviceTask task in tasks)
      {
        if (await surveillanceTaskRepository.GetByIdAsync(task.Id) != null)
          result.Add(await ConvertToDTO(task, "SurveillanceTaskDTO"));

        if (await pickAndDeliveryTaskRepository.GetByIdAsync(task.Id) != null)
          result.Add(await ConvertToDTO(task, "PickAndDeliveryTaskDTO"));
      }

      return result;
    }

    public async Task<TaskDTO> GetByIdAsync(DeviceTaskId id)
    {
      TaskDTO task = null;
      // var task = await repo.GetByIdAsync(id);

      //if (task == null)
      return null;

      //return new TaskDTO { Id = task.Id };
    }

    public async Task<TaskDTO> AddSurveillanceTask(SurveillanceTaskDTO dto)
    {
      try
      {
        SurveillanceTask t = new(new DeviceTaskId(Guid.NewGuid().ToString()), new TaskDescription(dto.Description), new UserName(dto.UserName), new UserPhoneNumber(dto.PhoneNumber), new FloorId(dto.FloorId), dto.StartCoordinateX, dto.StartCoordinateY, dto.EndCoordinateX, dto.EndCoordinateY, new UserId(dto.UserId));
        await surveillanceTaskRepository.AddAsync(t);
        await unitOfWork.CommitAsync();

        return await ConvertToDTO(t, "SurveillanceTaskDTO");
      }
      catch (Exception e)
      {
        Console.WriteLine($"Exception: {e.Message}");
        throw;
      }
    }

    public async Task<TaskDTO> AddPickAndDeliveryTask(PickAndDeliveryTaskDTO dto)
    {
      try
      {
        PickAndDeliveryTask t = new(new DeviceTaskId(Guid.NewGuid().ToString()), new TaskDescription(dto.Description), new UserName(dto.PickupUserName), new UserName(dto.DeliveryUserName), new UserPhoneNumber(dto.PickupUserPhoneNumber), new UserPhoneNumber(dto.DeliveryUserPhoneNumber), new RoomId(dto.PickupRoomId), new RoomId(dto.DeliveryRoomId), new ConfirmationCode(dto.ConfirmationCode), dto.StartCoordinateX, dto.StartCoordinateY, dto.EndCoordinateX, dto.EndCoordinateY, dto.StartFloorCode, dto.EndFloorCode, new UserId(dto.UserId));
        await pickAndDeliveryTaskRepository.AddAsync(t);
        await unitOfWork.CommitAsync();

        return await ConvertToDTO(t, "PickAndDeliveryTaskDTO");
      }
      catch (Exception e)
      {
        Console.WriteLine($"Exception: {e.Message}");
        throw;
      }
    }

    public async Task<DeviceTaskDto> UpdateAsync(TaskDTO dto)
    {
      TaskDTO task = null;
      // var task = await repo.GetByIdAsync(new DeviceTaskId(dto.Id));

      if (task == null)
        return null;

      // change all fields
      // ...

      await this.unitOfWork.CommitAsync();

      return null;
    }

    public async Task<DeviceTaskDto> InactivateAsync(DeviceTaskId id)
    {
      DeviceTaskDto task = null;
      // var task = await repo.GetByIdAsync(id);

      if (task == null)
        return null;

      // change all fields
      // ...

      await this.unitOfWork.CommitAsync();

      return new DeviceTaskDto { Id = task.Id };
    }

    public async Task<DeviceTaskDto> DeleteAsync(DeviceTaskId id)
    {
      DeviceTaskDto task = null;
      // var task = await repo.GetByIdAsync(id);

      if (task == null)
        return null;

      // if (task.Active)
      //   throw new BusinessRuleValidationException("It is not possible to delete an active task.");

      // repo.Remove(task);
      await unitOfWork.CommitAsync();

      return new DeviceTaskDto { Id = task.Id };
    }

    private async Task<TaskDTO> ConvertToDTO(DeviceTask t, string type)
    {
      if (type.Equals("SurveillanceTaskDTO"))
      {
        SurveillanceTask task = await surveillanceTaskRepository.GetByIdAsync(t.Id);
        return new SurveillanceTaskDTO(
            t.Id.Value,
            task.Description.Value,
            task.UserName.Name,
            task.UserPhoneNumber.PhoneNumber,
            task.FloorId.Value,
            task.StartCoordinateX,
            task.StartCoordinateY,
            task.EndCoordinateX,
            task.EndCoordinateY,
            t.UserId.Value
        );
      }

      if (type.Equals("PickAndDeliveryTaskDTO"))
      {
        PickAndDeliveryTask task = await pickAndDeliveryTaskRepository.GetByIdAsync(t.Id);

        return new PickAndDeliveryTaskDTO(
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
            t.UserId.Value
        );
      }

      return null;
    }
  }
}
