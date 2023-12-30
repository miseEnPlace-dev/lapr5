using MDTasks.Domain.Tasks;
using MDTasks.Infrastructure.Shared;
using MDTasks.Repositories;

namespace MDTasks.Infrastructure.Task;

public class TaskRepository : BaseRepository<DeviceTask, TaskId>, ITaskRepository
{
  readonly MySQLDbContext _context;

  public TaskRepository(MySQLDbContext context) : base(context.Requests)
  {
    _context = context;
  }
}
