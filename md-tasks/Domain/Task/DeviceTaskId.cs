using System;
using DDDSample1.Domain.Shared;
using Microsoft.EntityFrameworkCore;

namespace DDDSample1.Domain.DeviceTasks
{
  [Owned]
  public class DeviceTaskId : EntityId
  {
    public DeviceTaskId(Guid value) : base(value) { }

    public DeviceTaskId(string value) : base(value) { }

    public DeviceTaskId() : base(Guid.NewGuid()) { }
  }
}
