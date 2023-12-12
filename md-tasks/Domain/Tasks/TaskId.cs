using System;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Tasks
{
  public class TaskId : EntityId
  {
    public TaskId(String value) : base(value)
    {

    }

    override
    protected Object createFromString(String text)
    {
      return text;
    }
    override
    public String AsString()
    {
      return (String)base.Value;
    }
  }
}