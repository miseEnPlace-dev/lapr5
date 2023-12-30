using MDTasks.Domain.DTO;
using MDTasks.Domain.Requests;

namespace MDTasks.Mappers;

public class PickAndDeliveryRequestMapper
{
  public static PickAndDeliveryRequestDTO ToDTO(PickAndDeliveryRequest dto)
  {
    return new PickAndDeliveryRequestDTO(
        dto.Id.Value,
        dto.Description.Value,
        dto.PickupUserName.Name,
        dto.DeliveryUserName.Name,
        dto.PickupUserPhoneNumber.PhoneNumber,
        dto.DeliveryUserPhoneNumber.PhoneNumber,
        dto.PickupRoomId.Value,
        dto.DeliveryRoomId.Value,
        dto.ConfirmationCode.Code,
        dto.StartCoordinatesX,
        dto.StartCoordinatesY,
        dto.EndCoordinatesX,
        dto.EndCoordinatesY,
        dto.StartFloorCode,
        dto.EndFloorCode,
        dto.UserId.Value,
        dto.State.State.ToString(),
        dto.RequestedAt.ToString()
    );
  }
}