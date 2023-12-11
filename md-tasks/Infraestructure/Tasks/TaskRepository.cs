using DDDSample1.Domain.Tasks;
using DDDSample1.Infrastructure.Shared;

namespace DDDSample1.Infrastructure.Tasks;

public class TaskRepository : BaseRepository<Task, TaskId>, ITaskRepository
{
  public TaskRepository(DDDSample1DbContext context) : base(context.Tasks) { }
}