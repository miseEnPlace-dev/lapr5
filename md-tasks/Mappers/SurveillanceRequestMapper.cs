using MDTasks.Domain.DTO;
using MDTasks.Domain.Requests;

namespace MDTasks.Mappers;

public class SurveillanceRequestMapper
{
  public static SurveillanceRequestDTO ToDTO(SurveillanceRequest dto)
  {
    return new SurveillanceRequestDTO(
        dto.Id.Value,
        dto.Description.Value,
        dto.UserName.Name,
        dto.UserPhoneNumber.PhoneNumber,
        dto.FloorId.Value,
        dto.StartCoordinatesX,
        dto.StartCoordinatesY,
        dto.EndCoordinatesX,
        dto.EndCoordinatesY,
        dto.UserId.Value,
        dto.State.State.ToString(),
        dto.RequestedAt.ToString()
    );
  }
}