using System;

namespace DDDSample1.Domain.Requests;

public class RequestDto
{
  public Guid Id { get; set; }
  public string State { get; set; }

  public RequestDto(Guid Id, string State)
  {
    this.Id = Id;
    this.State = State;
  }
}