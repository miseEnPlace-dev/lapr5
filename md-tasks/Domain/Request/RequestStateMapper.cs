using DDDSample1.Domain.Requests;

namespace DDDNetCore.Domain.Request
{
  public class RequestStateMapper
  {
    public static RequestState ToRequestState(string state)
    {
      switch (state)
      {
        case "Pending":
          return new RequestState(StateEnum.Pending);
        case "Accepted":
          return new RequestState(StateEnum.Accepted);
        case "Rejected":
          return new RequestState(StateEnum.Rejected);
        default:
          return new RequestState(StateEnum.Pending);
      }
    }
  }
}
