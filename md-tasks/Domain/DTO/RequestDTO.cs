using Newtonsoft.Json;
namespace DDDSample1.Domain.DTO;

public abstract class RequestDTO
{
  public string Id { get; set; }
  public string UserId { get; set; }
  public string RequestedAt { get; set; }
  public string DeviceTaskId { get; set; }
  public string State { get; set; }

  public string Type { get; set; }

  [JsonConstructor]
  public RequestDTO(string userId, string requestedAt)
  {
    UserId = userId;
    RequestedAt = requestedAt;
  }

  public RequestDTO(string id, string type, string userId, string requestedAt, string state, string deviceTaskId)
  {
    Id = id;
    UserId = userId;
    RequestedAt = requestedAt;
    State = state;
    DeviceTaskId = deviceTaskId;
    Type = type;
  }
}
