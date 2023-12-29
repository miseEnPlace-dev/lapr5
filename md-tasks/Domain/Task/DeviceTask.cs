using System;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.User;

namespace DDDSample1.Domain.DeviceTasks
{
  public abstract class DeviceTask : Entity<DeviceTaskId>, IAggregateRoot
  {
    public UserId UserId { get; private set; }
    public DateTime RequestedAt { get; private set; }

    public DeviceTask(DeviceTaskId id, UserId userId)
    {
      Id = id;
      UserId = userId;
      RequestedAt = DateTime.Now;
    }

    public abstract void ExecuteTask();
  }
}
