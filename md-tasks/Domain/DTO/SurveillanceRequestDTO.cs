using Newtonsoft.Json;

namespace DDDSample1.Domain.DTO;

public class SurveillanceRequestDTO : RequestDTO
{
  public string UserName { get; set; }
  public string PhoneNumber { get; set; }
  public string FloorId { get; set; }
  public string Description { get; set; }

  [JsonConstructor]
  public SurveillanceRequestDTO(string description, string userName, string phoneNumber, string floorId, string userId) : base(userId)
  {
    UserName = userName;
    PhoneNumber = phoneNumber;
    FloorId = floorId;
    Description = description;
  }

  public SurveillanceRequestDTO(string id, string description, string userName, string phoneNumber, string floorId, int startCoordinateX, int startCoordinateY, int endCoordinateX, int endCoordinateY, string userId, string state, string requestedAt) : base(id, "surveillance", userId, state, requestedAt, startCoordinateX, startCoordinateY, endCoordinateX, endCoordinateY)
  {
    UserName = userName;
    PhoneNumber = phoneNumber;
    FloorId = floorId;
    Description = description;
    StartCoordinateX = startCoordinateX;
    StartCoordinateY = startCoordinateY;
    EndCoordinateX = endCoordinateX;
    EndCoordinateY = endCoordinateY;
  }
}
