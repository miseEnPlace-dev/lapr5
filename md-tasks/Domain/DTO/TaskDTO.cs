using Newtonsoft.Json;

namespace DDDSample1.Domain.DTO;
public abstract class TaskDTO
{
  public string Id { get; set; }
  public string Type { get; set; }
  public string UserId { get; set; }
  public string State { get; set; }
  public string RequestedAt { get; set; }

  [JsonConstructor]
  public TaskDTO(string userId)
  {
    UserId = userId;
  }

  public TaskDTO(string id, string type, string userId, string state, string requestedAt)
  {
    Id = id;
    Type = type;
    UserId = userId;
    State = state;
    RequestedAt = requestedAt;
  }
}
