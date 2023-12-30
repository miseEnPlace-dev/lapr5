using Newtonsoft.Json;

namespace MDTasks.Domain.DTO;

public class TaskDTO
{
  public string Id { get; set; }
  public string CreatedAt { get; set; }
  public string RequestId { get; set; }
  public string DeviceId { get; set; }

  [JsonConstructor]
  public TaskDTO(string requestedAt, string deviceId, string requestId)
  {
    CreatedAt = requestedAt;
    DeviceId = deviceId;
    RequestId = requestId;
  }

  public TaskDTO(string id, string createdAt, string deviceId, string requestId)
  {
    Id = id;
    CreatedAt = createdAt;
    DeviceId = deviceId;
    RequestId = requestId;
  }
}
