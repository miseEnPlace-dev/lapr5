using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Tasks
{
    public abstract class Task : Entity<TaskId>, IAggregateRoot
    {
        private Task() { }

        public Task(string code)
        {
            this.Id = new TaskId(code);
        }
    }
}