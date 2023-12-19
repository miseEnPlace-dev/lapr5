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

    public UserEmail UserEmail { get; private set; }

    public DeviceTaskId DeviceTaskId { get; private set; }

    public DateTime RequestedAt { get; private set; }

    public Request(UserEmail userEmail, DeviceTaskId DeviceTaskId)
    {
      this.DeviceTaskId = DeviceTaskId;
      State = new RequestState("Pending");
      UserEmail = userEmail;
      Id = new RequestId(Guid.NewGuid());
      RequestedAt = DateTime.Now;
    }

    public void ChangeState(RequestState state)
    {

      State = state;
    }
  }
}
