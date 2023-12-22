using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.DeviceTasks
{
  public abstract class DeviceTask : Entity<DeviceTaskId>, IAggregateRoot
  {
    public DeviceTask(DeviceTaskId id)
    {
      Id = id;
    }

    public abstract void ExecuteTask();
  }
}
