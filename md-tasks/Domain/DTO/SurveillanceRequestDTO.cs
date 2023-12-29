using Newtonsoft.Json;

namespace DDDSample1.Domain.DTO;

public class SurveillanceRequestDTO : RequestDTO
{
  public string UserName { get; set; }
  public string PhoneNumber { get; set; }
  public string FloorId { get; set; }
  public string StartRoomId { get; set; }
  public string EndRoomId { get; set; }
  public string Description { get; set; }
  public int StartCoordinateX { get; set; }
  public int StartCoordinateY { get; set; }
  public int EndCoordinateX { get; set; }
  public int EndCoordinateY { get; set; }

  [JsonConstructor]
  public SurveillanceRequestDTO(string userId, string requestedAt, string description, string userName, string phoneNumber, string floorId) : base(userId, requestedAt)
  {
    UserName = userName;
    PhoneNumber = phoneNumber;
    FloorId = floorId;
    Description = description;
  }

  public SurveillanceRequestDTO(string id, string userId, string description, string requestedAt, string state, string userName, string phoneNumber, string floorId, string deviceTaskId, int startCoordinateX, int startCoordinateY, int endCoordinateX, int endCoordinateY, string startRoomId, string endRoomId) : base(id, "surveillance", userId, requestedAt, state, deviceTaskId)
  {
    UserName = userName;
    PhoneNumber = phoneNumber;
    FloorId = floorId;
    Description = description;
    StartCoordinateX = startCoordinateX;
    StartCoordinateY = startCoordinateY;
    EndCoordinateX = endCoordinateX;
    EndCoordinateY = endCoordinateY;
    StartRoomId = startRoomId;
    EndRoomId = endRoomId;
  }
}
