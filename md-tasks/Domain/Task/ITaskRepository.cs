using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Tasks
{
  public interface ITaskRepository : IRepository<Task, TaskId>
  {

  }
}