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

  public RequestDto(Request req)
  {
    Id = req.Id.AsGuid();
    State = req.State.AsString();
    UserEmail = req.UserEmail.ToString();
    DeviceModelCode = req.DeviceModelCode.AsString();
    DeviceTaskId = req.DeviceTaskId.ToString();
  }
}
