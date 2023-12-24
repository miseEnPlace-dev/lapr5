using Newtonsoft.Json;

namespace DDDSample1.Domain.DTO;

public class SurveillanceRequestDTO : RequestDTO
{
  public string ContactEmail { get; set; }

  public string FloorId { get; set; }

  public string Description { get; set; }

  [JsonConstructor]
  public SurveillanceRequestDTO(string userId, string requestedAt, string contactEmail, string floorId) : base(userId, requestedAt)
  {
    this.ContactEmail = contactEmail;
    this.FloorId = floorId;
  }

  public SurveillanceRequestDTO(string id, string userId, string description, string requestedAt, StateEnum state, string contactEmail, string floorId, string deviceTaskId) : base(id, userId, requestedAt, state, deviceTaskId)
  {
    this.ContactEmail = contactEmail;
    this.FloorId = floorId;
    this.Description = description;
  }
}