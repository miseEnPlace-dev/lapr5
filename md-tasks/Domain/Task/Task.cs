using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Tasks
{
    public abstract class DeviceTask : Entity<TaskId>, IAggregateRoot
    {
        public DeviceTask() { }

        public DeviceTask(string code)
        {
            this.Id = new TaskId(code);
        }

        public abstract void ExecuteTask();
    }
}