using Newtonsoft.Json;
namespace DDDSample1.Domain.DTO;

public abstract class RequestDTO
{
  public string Id { get; set; }

  public string UserId { get; set; }

  public string RequestedAt { get; set; }

  public string DeviceTaskId { get; set; }

  public StateEnum State { get; set; }

  [JsonConstructor]
  public RequestDTO(string userId, string requestedAt)
  {
    this.UserId = userId;
    this.RequestedAt = requestedAt;
  }

  public RequestDTO(string id, string userId, string requestedAt, StateEnum state, string deviceTaskId)
  {
    this.Id = id;
    this.UserId = userId;
    this.RequestedAt = requestedAt;
    this.State = state;
    this.DeviceTaskId = deviceTaskId;
  }
}