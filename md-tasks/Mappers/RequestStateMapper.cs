
using MDTasks.Domain.Request;

namespace MDTasks.Mappers;

public class RequestStateMapper
{
  public static RequestState ToRequestState(string state)
  {
    return state.ToLower() switch
    {
      "pending" => new RequestState(RequestStateEnum.Pending),
      "accepted" => new RequestState(RequestStateEnum.Accepted),
      "rejected" => new RequestState(RequestStateEnum.Rejected),
      "executed" => new RequestState(RequestStateEnum.Executed),
      _ => new RequestState(RequestStateEnum.Pending),
    };
  }
}
