using DDDSample1.Domain.Tasks;
using DDDSample1.Infrastructure.Shared;
using DeviceTask = DDDSample1.Domain.Tasks.DeviceTask;

namespace DDDSample1.Infrastructure.Tasks;

public class TaskRepository : BaseRepository<DeviceTask, TaskId>, ITaskRepository
{
  public TaskRepository(DDDSample1DbContext context) : base(null) { }
}