using Newtonsoft.Json;

namespace DDDSample1.Domain.DTO;

public class SurveillanceRequestDTO : RequestDTO
{
  public string UserName { get; set; }
  public string PhoneNumber { get; set; }
  public string FloorId { get; set; }
  public string Description { get; set; }
  public int StartCoordinateX { get; set; }
  public int StartCoordinateY { get; set; }
  public int EndCoordinateX { get; set; }
  public int EndCoordinateY { get; set; }

  [JsonConstructor]
  public SurveillanceRequestDTO(string requestedAt, string description, string userName, string phoneNumber, string floorId, string deviceId, string deviceTaskId) : base(requestedAt, deviceId, deviceTaskId)
  {
    UserName = userName;
    PhoneNumber = phoneNumber;
    FloorId = floorId;
    Description = description;
  }

  public SurveillanceRequestDTO(string id, string description, string requestedAt, string state, string userName, string phoneNumber, string floorId, string deviceTaskId, int startCoordinateX, int startCoordinateY, int endCoordinateX, int endCoordinateY, string deviceId) : base(id, "surveillance", requestedAt, state, deviceTaskId, deviceId)
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
