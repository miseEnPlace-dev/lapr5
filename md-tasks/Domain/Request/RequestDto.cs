using System;

namespace DDDSample1.Domain.Requests;

public class RequestDto
{
  public Guid Id { get; set; }
  public string State { get; set; }

  public string UserId { get; set; }

  public string DeviceModelId { get; set; }

  public RequestDto(Guid Id, string State, string UserId, string DeviceModelId)
  {
    this.Id = Id;
    this.State = State;
    this.UserId = UserId;
    this.DeviceModelId = DeviceModelId;
  }
}