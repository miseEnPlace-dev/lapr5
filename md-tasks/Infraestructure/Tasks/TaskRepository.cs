using DDDSample1.Infrastructure.Shared;

namespace DDDSample1.Infrastructure.Tasks
{
  public class TaskRepository : BaseRepository<Task, TaskId>, ITaskRepository
  {

  }
}