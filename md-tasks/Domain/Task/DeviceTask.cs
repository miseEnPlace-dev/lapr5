using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.DeviceTasks
{
  public class DeviceTask : Entity<DeviceTaskId>, IAggregateRoot
  {
    public DeviceTask() { }

    public DeviceTask(string code)
    {
      this.Id = new DeviceTaskId(code);
    }

    // public abstract void ExecuteTask();
  }
}
