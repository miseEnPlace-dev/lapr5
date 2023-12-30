using System.Collections.Generic;
using System.Threading.Tasks;
using MDTasks.Domain.Requests;
using MDTasks.Domain.Shared;

namespace MDTasks.Repositories;

public interface IPickAndDeliveryRequestRepository : IRepository<PickAndDeliveryRequest, RequestId>
{
  public Task<List<PickAndDeliveryRequest>> GetRequestsByState(RequestState state, int page, int limit);
}
