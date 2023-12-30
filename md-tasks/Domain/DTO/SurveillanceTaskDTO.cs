using Newtonsoft.Json;

namespace DDDSample1.Domain.DTO;

public class SurveillanceTaskDTO : TaskDTO
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
  public SurveillanceTaskDTO(string description, string userName, string phoneNumber, string floorId, string userId) : base(userId)
  {
    UserName = userName;
    PhoneNumber = phoneNumber;
    FloorId = floorId;
    Description = description;
  }

  public SurveillanceTaskDTO(string id, string description, string userName, string phoneNumber, string floorId, int startCoordinateX, int startCoordinateY, int endCoordinateX, int endCoordinateY, string userId, string state, string requestedAt) : base(id, "surveillance", userId, state, requestedAt)
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
