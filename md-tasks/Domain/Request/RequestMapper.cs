using System.Threading.Tasks;
using DDDSample1.Domain.DeviceTasks;
using DDDSample1.Domain.DeviceTasks.PickAndDeliveryTasks;
using DDDSample1.Domain.DeviceTasks.SurveillanceTasks;
using DDDSample1.Domain.DTO;

public class RequestMapper
{
  private readonly ISurveillanceRequestRepository surveillanceTaskRepository;
  private readonly IPickAndDeliveryRequestRepository pickAndDeliveryTaskRepository;

  public RequestMapper(ISurveillanceRequestRepository surveillanceTaskRepository, IPickAndDeliveryRequestRepository pickAndDeliveryTaskRepository)
  {
    this.surveillanceTaskRepository = surveillanceTaskRepository;
    this.pickAndDeliveryTaskRepository = pickAndDeliveryTaskRepository;
  }

  public async Task<RequestDTO> ToDto(Request t, string type)
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
