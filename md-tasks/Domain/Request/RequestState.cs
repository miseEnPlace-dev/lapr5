using System.Collections.Generic;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Requests
{
  public class RequestState : ValueObject
  {
    public string State { get; private set; }

    private RequestState()
    {
      State = "Pending";
    }

    public RequestState(string State)
    {
      this.State = State;
    }

    public void ChangeState(string State)
    {
      this.State = State;
    }

    protected override IEnumerable<object> GetEqualityComponents()
    {
      yield return State;
    }

    public string AsString()
    {
      return State;
    }
  }
}
