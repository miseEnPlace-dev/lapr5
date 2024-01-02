using System.Collections.Generic;
using MDTasks.Domain.Shared;
using Microsoft.EntityFrameworkCore;

namespace MDTasks.Domain.Request;

[Owned]
public class RequestState : ValueObject
{
  public RequestStateEnum State { get; private set; }

  private RequestState()
  {
    State = RequestStateEnum.Pending;
  }

  public RequestState(RequestStateEnum State)
  {
    this.State = State;
  }

  protected override IEnumerable<object> GetEqualityComponents()
  {
    yield return State;
  }

  public string AsString()
  {
    return State.ToString();
  }

  public bool Equals(RequestState other)
  {
    return State == other.State;
  }
}
