using DDDSample1.Domain.Requests;

namespace DDDNetCore.Domain.Request
{
  public class RequestStateMapper
  {
    public static RequestState ToRequestState(string state)
    {
      switch (state.ToLower())
      {
        case "pending":
          return new RequestState(StateEnum.Pending);
        case "accepted":
          return new RequestState(StateEnum.Accepted);
        case "rejected":
          return new RequestState(StateEnum.Rejected);
        default:
          return new RequestState(StateEnum.Pending);
      }
    }
  }
}
