using DDDSample1.Infrastructure.Shared;
using DDDSample1.Domain.DeviceTasks;

namespace DDDSample1.Infrastructure.DeviceTasks;

public class DeviceTaskRepository : BaseRepository<DeviceTask, DeviceTaskId>, IDeviceTaskRepository
{
  public DeviceTaskRepository(MySQLDbContext context) : base(context.Tasks) { }
}