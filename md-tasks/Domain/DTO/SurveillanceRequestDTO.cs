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
    this.UserName = userName;
    this.FloorId = floorId;
    this.PhoneNumber = phoneNumber;
  }

  public SurveillanceRequestDTO(string id, string userId, string description, string requestedAt, StateEnum state, string userName, string phoneNumber, string floorId, string deviceTaskId) : base(id, userId, requestedAt, state, deviceTaskId)
  {
    this.UserName = userName;
    this.PhoneNumber = phoneNumber;
    this.FloorId = floorId;
    this.Description = description;
  }
}