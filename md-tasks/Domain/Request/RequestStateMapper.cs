using DDDSample1.Domain.Requests;

namespace DDDNetCore.Domain.Request
{
  public class RequestStateMapper
  {
    public static RequestState ToRequestState(string state)
    {
      return state.ToLower() switch
      {
        "pending" => new RequestState(StateEnum.Pending),
        "accepted" => new RequestState(StateEnum.Accepted),
        "rejected" => new RequestState(StateEnum.Rejected),
        "executed" => new RequestState(StateEnum.Executed),
        _ => new RequestState(StateEnum.Pending),
      };
    }
  }
}
