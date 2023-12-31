using System.Collections.Generic;
using DDDSample1.Domain.Shared;
using Microsoft.EntityFrameworkCore;

namespace DDDSample1.Domain.Requests
{
  [Owned]
  public class RequestState : ValueObject
  {
    public StateEnum State { get; private set; }

    private RequestState()
    {
      State = StateEnum.Pending;
    }

    public RequestState(StateEnum State)
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
}
