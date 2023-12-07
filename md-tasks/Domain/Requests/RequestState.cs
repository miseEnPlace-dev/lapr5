using System;
using DDDSample1.Domain.Requests;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Categories
{
  public class RequestState : IValueObject<RequestId>
  {

    public string State { get; private set; }

    private RequestState()
    {
      this.State = "Pending";
    }

    public RequestState(string state)
    {
      this.State = state;
    }

    public void ChangeState(string state)
    {
      this.State = state;
    }
  }
}