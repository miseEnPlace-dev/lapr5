using System.Collections.Generic;
using System.Threading.Tasks;
using MDTasks.Domain.Requests;
using MDTasks.Domain.Shared;

namespace MDTasks.Repositories;

public interface ISurveillanceRequestRepository : IRepository<SurveillanceRequest, RequestId>
{
  public Task<List<SurveillanceRequest>> GetRequestsByState(RequestState state, int page, int limit);
}
