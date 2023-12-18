using System;
using Microsoft.Extensions.Logging;

namespace DDDSample1.Domain.Requests;

public class RequestDto
{
  public Guid Id { get; set; }
  public string State { get; set; }

  public string UserEmail { get; set; }

  public string DeviceModelCode { get; set; }

  public string DeviceTaskId { get; set; }

  public RequestDto(Guid Id, string State, string UserEmail, string DeviceModelCode, string DeviceTaskId)
  {
    this.Id = Id;
    this.State = State;
    this.UserEmail = UserEmail;
    this.DeviceModelCode = DeviceModelCode;
    this.DeviceTaskId = DeviceTaskId;
  }
}