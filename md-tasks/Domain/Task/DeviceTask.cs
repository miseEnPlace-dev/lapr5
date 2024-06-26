using System;
using MDTasks.Domain.Request;
using MDTasks.Domain.Shared;

namespace MDTasks.Domain.Task;

public class DeviceTask : Entity<TaskId>, IAggregateRoot
{
  public RequestId RequestId { get; private set; }
  public DateTime CreatedAt { get; private set; }
  public string DeviceId { get; private set; }
  public bool IsFinished { get; private set; }

  public DeviceTask(RequestId requestId, string deviceId)
  {
    RequestId = requestId;
    Id = new TaskId(Guid.NewGuid());
    CreatedAt = DateTime.Now;
    DeviceId = deviceId;
    IsFinished = false;
  }

  public DeviceTask(TaskId id, RequestId requestId, DateTime requestedAt, string deviceId)
  {
    RequestId = requestId;
    Id = id;
    CreatedAt = requestedAt;
    DeviceId = deviceId;
    IsFinished = false;
  }

  public void Finish()
  {
    IsFinished = true;
  }
}
