using System.Threading.Tasks;
using DDDSample1.Domain.DeviceTasks.PickAndDeliveryTasks;
using DDDSample1.Domain.DeviceTasks.SurveillanceTasks;
using DDDSample1.Domain.DTO;
using DDDSample1.Domain.Requests;

public class TaskMapper
{
  private readonly ISurveillanceRequestRepository svReqRepo;
  private readonly IPickAndDeliveryRequestRepository pdReqRepo;

  public TaskMapper(ISurveillanceRequestRepository svReqRepo, IPickAndDeliveryRequestRepository pdReqRepo)
  {
    this.svReqRepo = svReqRepo;
    this.pdReqRepo = pdReqRepo;
  }

  public async Task<TaskDTO> ToDto(DeviceTask t, string type)
  {
    if (type.Equals("SurveillanceTaskDTO"))
    {
      SurveillanceRequest task = await svReqRepo.GetByIdAsync(t.RequestId);
      if (task == null) return null;

      return new SurveillanceTaskDTO(
          t.Id.Value,
          task.Description.Value,
          t.CreatedAt.ToString(),
          task.UserName.Name,
          task.UserPhoneNumber.PhoneNumber,
          task.FloorId.Value,
          task.Id.Value,
          task.StartCoordinateX,
          task.StartCoordinateY,
          task.EndCoordinateX,
          task.EndCoordinateY,
          t.DeviceId,
          task.UserId.Value
      );
    }

    if (type.Equals("PickDeliveryTaskDTO"))
    {
      PickAndDeliveryRequest task = await pdReqRepo.GetByIdAsync(t.RequestId);
      if (task == null) return null;

      return new PickDeliveryTaskDTO(
          t.Id.Value,
          task.Description.Value,
          t.CreatedAt.ToString(),
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
          t.DeviceId,
          task.UserId.Value
      );
    }
    return null;
  }
}
