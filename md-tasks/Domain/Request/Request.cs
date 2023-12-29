using System;
using DDDSample1.Domain.DeviceModel;
using DDDSample1.Domain.DeviceTasks;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.User;

namespace DDDSample1.Domain.Requests
{
  public class Request : Entity<RequestId>, IAggregateRoot
  {
    public RequestState State { get; private set; }
    public DeviceTaskId DeviceTaskId { get; private set; }
    public DateTime RequestedAt { get; private set; }
    public string DeviceId { get; private set; }

    public Request(DeviceTaskId DeviceTaskId, string deviceId)
    {
      this.DeviceTaskId = DeviceTaskId;
      State = new RequestState(StateEnum.Pending);
      Id = new RequestId(Guid.NewGuid());
      RequestedAt = DateTime.Now;
      DeviceId = deviceId;
    }

    public Request(RequestId id, DeviceTaskId DeviceTaskId, RequestState state, DateTime requestedAt, string deviceId)
    {
      this.DeviceTaskId = DeviceTaskId;
      State = state;
      Id = id;
      RequestedAt = requestedAt;
      DeviceId = deviceId;
    }

    public void ChangeState(RequestState state)
    {
      State = state;
    }
  }
}
