using System;
using DDDSample1.Domain.Shared;
using Newtonsoft.Json;

namespace DDDSample1.Domain.Requests
{
  public class TaskId : EntityId
  {

    [JsonConstructor]
    public TaskId(Guid value) : base(value) { }

    public TaskId(string value) : base(value) { }

    public TaskId() : base(Guid.NewGuid()) { }

  }
}
