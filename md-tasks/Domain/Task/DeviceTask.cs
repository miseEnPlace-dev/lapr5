using System;
using DDDSample1.Domain.DeviceTasks;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Requests
{
  public class DeviceTask : Entity<TaskId>, IAggregateRoot
  {
    public RequestId DeviceTaskId { get; private set; }
    public DateTime CreatedAt { get; private set; }
    public string DeviceId { get; private set; }

    public DeviceTask(RequestId DeviceTaskId, string deviceId)
    {
      this.DeviceTaskId = DeviceTaskId;
      Id = new TaskId(Guid.NewGuid());
      CreatedAt = DateTime.Now;
      DeviceId = deviceId;
    }

    public DeviceTask(TaskId id, RequestId DeviceTaskId, RequestState state, DateTime requestedAt, string deviceId)
    {
      this.DeviceTaskId = DeviceTaskId;
      Id = id;
      CreatedAt = requestedAt;
      DeviceId = deviceId;
    }

  }
}
