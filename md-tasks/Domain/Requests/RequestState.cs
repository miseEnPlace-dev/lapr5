using DDDSample1.Domain.Requests;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Requests
{
  public class RequestState : IValueObject<RequestId>
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
  }
}