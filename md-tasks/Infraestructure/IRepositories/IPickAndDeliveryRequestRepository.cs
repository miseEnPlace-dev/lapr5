using System.Collections.Generic;
using System.Threading.Tasks;
using MDTasks.Domain.Request;
using MDTasks.Domain.User;

namespace MDTasks.Infrastructure;

public interface IPickAndDeliveryRequestRepository : IRepository<PickAndDeliveryRequest, RequestId>
{
    Task<List<PickAndDeliveryRequest>> GetAllOrderedByRequestedAt(int page, int limit);
    Task<List<PickAndDeliveryRequest>> GetRequestsByState(RequestState state, int page, int limit);
    Task<List<PickAndDeliveryRequest>> GetRequestsByUserIdAsync(UserId id, int page, int limit);
}
