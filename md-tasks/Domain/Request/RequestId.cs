using System;
using DDDSample1.Domain.Shared;
using Microsoft.EntityFrameworkCore;

namespace DDDSample1.Domain.DeviceTasks
{
  [Owned]
  public class RequestId : EntityId
  {
    public RequestId(Guid value) : base(value) { }

    public RequestId(string value) : base(value) { }

    public RequestId() : base(Guid.NewGuid()) { }
  }
}
