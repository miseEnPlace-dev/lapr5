using Newtonsoft.Json;

namespace MDTasks.Domain.DTO;

public abstract class RequestDTO
{
  public string Id { get; set; }
  public string Type { get; set; }
  public string UserId { get; set; }
  public string State { get; set; }
  public string RequestedAt { get; set; }
  public string Description { get; set; }

  [JsonConstructor]
  public RequestDTO(string userId, string description)
  {
    UserId = userId;
    Description = description;
  }

  public RequestDTO(string id, string type, string userId, string state, string requestedAt, string description)
  {
    Id = id;
    Type = type;
    UserId = userId;
    State = state;
    RequestedAt = requestedAt;
    Description = description;
  }
}
