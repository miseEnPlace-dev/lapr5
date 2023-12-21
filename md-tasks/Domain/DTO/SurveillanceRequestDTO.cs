using Newtonsoft.Json;

namespace DDDSample1.Domain.DTO;

public class SurveillanceRequestDTO : RequestDTO
{
  public string ContactEmail { get; set; }

  public string FloorCode { get; set; }

  [JsonConstructor]
  public SurveillanceRequestDTO(string userId, string requestedAt, string contactEmail, string floorCode, string deviceTaskId) : base(userId, requestedAt, deviceTaskId)
  {
    this.ContactEmail = contactEmail;
    this.FloorCode = floorCode;
  }

  public SurveillanceRequestDTO(string id, string userId, string requestedAt, StateEnum state, string contactEmail, string floorCode, string deviceTaskId) : base(id, userId, requestedAt, state, deviceTaskId)
  {
    this.ContactEmail = contactEmail;
    this.FloorCode = floorCode;
  }
}