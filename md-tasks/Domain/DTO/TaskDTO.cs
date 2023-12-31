using Newtonsoft.Json;
namespace DDDSample1.Domain.DTO;

public class TaskDTO
{
  public string Id { get; set; }
  public string CreatedAt { get; set; }
  public string RequestId { get; set; }
  public string DeviceId { get; set; }
  public string Type { get; set; }

  [JsonConstructor]
  public TaskDTO(string requestedAt, string deviceId, string requestId)
  {
    CreatedAt = requestedAt;
    DeviceId = deviceId;
    RequestId = requestId;
  }

  public TaskDTO(string id, string type, string createdAt, string requestId, string deviceId)
  {
    Id = id;
    CreatedAt = createdAt;
    RequestId = requestId;
    Type = type;
    DeviceId = deviceId;
  }
}
