using System;
using MDTasks.Domain.Shared;
using Microsoft.EntityFrameworkCore;

namespace MDTasks.Domain.Requests;

[Owned]
public class RequestId : EntityId
{
  public RequestId(Guid value) : base(value) { }

  public RequestId(string value) : base(value) { }

  public RequestId() : base(Guid.NewGuid()) { }
}
