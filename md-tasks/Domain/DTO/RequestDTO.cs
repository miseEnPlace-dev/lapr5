using Newtonsoft.Json;
namespace DDDSample1.Domain.DTO;

public class RequestDTO
{
  public string Id { get; set; }
  public string RequestedAt { get; set; }
  public string DeviceTaskId { get; set; }
  public string State { get; set; }
  public string DeviceId { get; set; }
  public string Type { get; set; }

  [JsonConstructor]
  public RequestDTO(string requestedAt, string deviceId, string deviceTaskId)
  {
    RequestedAt = requestedAt;
    DeviceId = deviceId;
    DeviceTaskId = deviceTaskId;
  }

  public RequestDTO(string id, string type, string requestedAt, string state, string deviceTaskId, string deviceId)
  {
    Id = id;
    RequestedAt = requestedAt;
    State = state;
    DeviceTaskId = deviceTaskId;
    Type = type;
    DeviceId = deviceId;
  }
}
