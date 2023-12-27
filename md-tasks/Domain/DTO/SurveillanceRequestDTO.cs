using Newtonsoft.Json;

namespace DDDSample1.Domain.DTO;

public class SurveillanceRequestDTO : RequestDTO
{
  public string UserName { get; set; }
  public string PhoneNumber { get; set; }
  public string FloorId { get; set; }
  public string Description { get; set; }

  [JsonConstructor]
  public SurveillanceRequestDTO(string userId, string requestedAt, string userName, string phoneNumber, string floorId) : base(userId, requestedAt)
  {
    UserName = userName;
    FloorId = floorId;
    PhoneNumber = phoneNumber;
  }

  public SurveillanceRequestDTO(string id, string userId, string description, string requestedAt, string state, string userName, string phoneNumber, string floorId, string deviceTaskId) : base(id, "surveillance", userId, requestedAt, state, deviceTaskId)
  {
    UserName = userName;
    PhoneNumber = phoneNumber;
    FloorId = floorId;
    Description = description;
  }
}
