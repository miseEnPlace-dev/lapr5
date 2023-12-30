using DDDSample1.Infrastructure.Shared;
using DDDSample1.Domain.DeviceTasks;
using DDDSample1.Domain.DeviceTasks.PickAndDeliveryTasks;

namespace DDDSample1.Infrastructure.DeviceTasks;

public class PickAndDeliveryTaskRepository : BaseRepository<PickAndDeliveryTask, DeviceTaskId>, IPickAndDeliveryTaskRepository
{
  readonly MySQLDbContext _context;
  public PickAndDeliveryTaskRepository(MySQLDbContext context) : base(context.PickAndDeliveryTasks)
  {
    _context = context;
  }
}
