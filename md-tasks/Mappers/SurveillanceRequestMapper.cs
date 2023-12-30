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
        dto.StartCoordinateX,
        dto.StartCoordinateY,
        dto.EndCoordinateX,
        dto.EndCoordinateY,
        dto.UserId.Value,
        dto.State.State.ToString(),
        dto.RequestedAt.ToString()
    );
  }
}