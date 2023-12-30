using System;
using MDTasks.Domain.Requests;
using MDTasks.Domain.Shared;

namespace MDTasks.Domain.Tasks;

public class DeviceTask : Entity<TaskId>, IAggregateRoot
{
  public RequestId RequestId { get; private set; }
  public DateTime CreatedAt { get; private set; }
  public string DeviceId { get; private set; }

  public DeviceTask(RequestId requestId, string deviceId)
  {
    Id = new TaskId(Guid.NewGuid());
    RequestId = requestId;
    CreatedAt = DateTime.Now;
    DeviceId = deviceId;
  }

  public DeviceTask(TaskId id, RequestId requestId, DateTime requestedAt, string deviceId)
  {
    Id = id;
    RequestId = requestId;
    CreatedAt = requestedAt;
    DeviceId = deviceId;
  }
}
