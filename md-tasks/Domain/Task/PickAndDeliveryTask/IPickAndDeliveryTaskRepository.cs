using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.DeviceTasks.PickAndDeliveryTasks;
public interface IPickAndDeliveryTaskRepository : IRepository<PickAndDeliveryTask, DeviceTaskId>
{

}
