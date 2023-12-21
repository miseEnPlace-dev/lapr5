using DDDSample1.Infrastructure.Shared;
using DDDSample1.Domain.DeviceTasks;
using DDDSample1.Domain.DeviceTasks.PickAndDeliveryTask;

namespace DDDSample1.Infrastructure.DeviceTasks;

public class PickAndDeliveryTaskRepository : BaseRepository<PickAndDeliveryTask, DeviceTaskId>, IPickAndDeliveryTaskRepository
{
  public PickAndDeliveryTaskRepository(MySQLDbContext context) : base(context.PickAndDeliveryTasks) { }
}
