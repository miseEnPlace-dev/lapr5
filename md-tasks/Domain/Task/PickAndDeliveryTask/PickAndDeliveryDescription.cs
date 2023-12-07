using System;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Task.PickAndDeliveryTask
{
  public class PickAndDeliveryDescription : IValueObject<TaskId>
  {

    public string Description { get; private set; }

    private PickAndDeliveryDescription()
    {
      Description = "";
    }

    public PickAndDeliveryDescription(string Description)
    {
      this.Description = Description;
    }
  }
}