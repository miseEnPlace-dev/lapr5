using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.DeviceTasks.PickAndDeliveryTask;
public interface IPickAndDeliveryTaskRepository : IRepository<PickAndDeliveryTask, DeviceTaskId>
{

}
