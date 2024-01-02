using System;
using MDTasks.Domain.Shared;
using Newtonsoft.Json;

namespace MDTasks.Domain.Task;

public class TaskId : EntityId
{
  [JsonConstructor]
  public TaskId(Guid value) : base(value) { }

  public TaskId(string value) : base(value) { }

  public TaskId() : base(Guid.NewGuid()) { }
}
