using System;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Tasks;

namespace DDDSample1.Domain.Categories
{
  public class SurveillanceTask : Entity<TaskId>, IAggregateRoot
  {
    public string Description { get; private set; }

    public SurveillanceTask()
    {
      Description = "";
    }

    public SurveillanceTask(string Description)
    {
      Id = new TaskId(Guid.NewGuid());
      this.Description = Description;
    }

    public void ChangeDescription(string Description)
    {
      this.Description = Description;
    }
  }
}