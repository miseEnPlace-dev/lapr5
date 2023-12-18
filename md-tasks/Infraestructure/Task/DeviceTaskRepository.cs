using DDDSample1.Domain.Tasks;
using DDDSample1.Infrastructure.Shared;
using DDDSample1.Domain.DeviceTasks;

namespace DDDSample1.Infrastructure.DeviceTasks;

public class DeviceTaskRepository : BaseRepository<DeviceTask, TaskId>, ITaskRepository
{
  public DeviceTaskRepository(DDDSample1DbContext context) : base(null) { }
}