using Newtonsoft.Json;
namespace DDDSample1.Domain.DTO;

public class TaskDTO
{
  public string Id { get; set; }
  public string CreatedAt { get; set; }
  public string DeviceTaskId { get; set; }
  public string DeviceId { get; set; }
  public string Type { get; set; }

  [JsonConstructor]
  public TaskDTO(string requestedAt, string deviceId, string deviceTaskId)
  {
    CreatedAt = requestedAt;
    DeviceId = deviceId;
    DeviceTaskId = deviceTaskId;
  }

  public TaskDTO(string id, string type, string createdAt, string deviceTaskId, string deviceId)
  {
    Id = id;
    CreatedAt = createdAt;
    DeviceTaskId = deviceTaskId;
    Type = type;
    DeviceId = deviceId;
  }
}