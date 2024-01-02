using System.Collections.Generic;
using System.Threading.Tasks;
using MDTasks.Domain.Request;
using MDTasks.Domain.User;

namespace MDTasks.Infrastructure;

public interface ISurveillanceRequestRepository : IRepository<SurveillanceRequest, RequestId>
{
  Task<List<SurveillanceRequest>> GetAllOrderedByRequestedAt(int page, int limit);
  Task<List<SurveillanceRequest>> GetRequestsByState(RequestState state, int page, int limit);
  Task<List<SurveillanceRequest>> GetRequestsByUserIdAsync(UserId id, int page, int limit);
}
