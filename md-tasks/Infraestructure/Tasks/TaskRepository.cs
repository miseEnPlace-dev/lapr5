using DDDSample1.Domain.Tasks;
using DDDSample1.Infrastructure.Shared;
using Task = DDDSample1.Domain.Tasks.Task;

namespace DDDSample1.Infrastructure.Tasks;

public class TaskRepository : BaseRepository<Task, TaskId>, ITaskRepository
{
  public TaskRepository(DDDSample1DbContext context) : base(null) { }
}