using System;
using DDDSample1.Domain.Shared;
using Microsoft.EntityFrameworkCore;

namespace DDDSample1.Domain.DeviceTasks
{
  [Owned]
  public class DeviceTaskId : EntityId
  {
    public DeviceTaskId(String value) : base(value)
    {

    }
  }
}
