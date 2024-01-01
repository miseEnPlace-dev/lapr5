using Newtonsoft.Json;

namespace DDDSample1.Domain.DTO;

public class SurveillanceTaskDTO : TaskDTO
{
  public string UserName { get; set; }
  public string PhoneNumber { get; set; }
  public string FloorId { get; set; }
  public string Description { get; set; }



  [JsonConstructor]
  public SurveillanceTaskDTO(string requestedAt, string description, string userName, string phoneNumber, string floorId, string deviceId, string deviceTaskId) : base(requestedAt, deviceId, deviceTaskId)
  {
    UserName = userName;
    PhoneNumber = phoneNumber;
    FloorId = floorId;
    Description = description;
  }

  public SurveillanceTaskDTO(string id, string description, string requestedAt, string userName, string phoneNumber, string floorId, string deviceTaskId, int startCoordinateX, int startCoordinateY, int endCoordinateX, int endCoordinateY, string deviceId, string userId) : base(id, "surveillance", requestedAt, deviceTaskId, deviceId, userId, startCoordinateX, startCoordinateY, endCoordinateX, endCoordinateY)
  {
    UserName = userName;
    PhoneNumber = phoneNumber;
    FloorId = floorId;
    Description = description;
  }
}
