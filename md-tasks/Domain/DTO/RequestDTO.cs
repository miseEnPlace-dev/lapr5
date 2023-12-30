using Newtonsoft.Json;

namespace DDDSample1.Domain.DTO;
public abstract class RequestDTO
{
  public string Id { get; set; }
  public string Type { get; set; }
  public string UserId { get; set; }
  public string State { get; set; }
  public string RequestedAt { get; set; }

  [JsonConstructor]
  public RequestDTO(string userId)
  {
    UserId = userId;
  }

  public RequestDTO(string id, string type, string userId, string state, string requestedAt)
  {
    Id = id;
    Type = type;
    UserId = userId;
    State = state;
    RequestedAt = requestedAt;
  }
}
