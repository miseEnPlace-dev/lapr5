using System;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.DeviceTasks
{
  public class TaskId : EntityId
  {
    public TaskId(String value) : base(value)
    {

    }
  }
}