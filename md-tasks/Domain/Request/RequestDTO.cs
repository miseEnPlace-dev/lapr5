using System;

public class RequestDTO
{
  public Guid RequestId { get; set; }
  public string State { get; set; }

  public RequestDTO(Guid requestId, string state)
  {
    RequestId = requestId;
    State = state;
  }
}