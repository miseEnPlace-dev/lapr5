using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.DeviceTasks.PickAndDeliveryTasks;
public interface IPickAndDeliveryRequestRepository : IRepository<PickAndDeliveryRequest, RequestId>
{

}