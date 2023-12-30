using System;
using DDDSample1.Domain.DeviceTasks;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Requests
{
  public class Request : Entity<RequestId>, IAggregateRoot
  {
    public DeviceTaskId DeviceTaskId { get; private set; }
    public DateTime CreatedAt { get; private set; }
    public string DeviceId { get; private set; }

    public Request(DeviceTaskId DeviceTaskId, string deviceId)
    {
      this.DeviceTaskId = DeviceTaskId;
      Id = new RequestId(Guid.NewGuid());
      CreatedAt = DateTime.Now;
      DeviceId = deviceId;
    }

    public Request(RequestId id, DeviceTaskId DeviceTaskId, RequestState state, DateTime requestedAt, string deviceId)
    {
      this.DeviceTaskId = DeviceTaskId;
      Id = id;
      CreatedAt = requestedAt;
      DeviceId = deviceId;
    }

  }
}
