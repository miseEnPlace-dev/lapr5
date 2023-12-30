using System.Collections.Generic;
using System.Threading.Tasks;
using DDDSample1.Domain.Requests;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.DeviceTasks.PickAndDeliveryTasks;
public interface IPickAndDeliveryRequestRepository : IRepository<PickAndDeliveryRequest, RequestId>
{
    Task<List<PickAndDeliveryRequest>> GetRequestsByState(RequestState state, int page, int limit);
}
