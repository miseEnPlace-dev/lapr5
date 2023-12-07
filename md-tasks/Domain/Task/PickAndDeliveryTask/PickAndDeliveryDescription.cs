using System;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Tasks;

namespace DDDSample1.Domain.Categories
{
  public class PickAndDeliveryDescription : IValueObject<TaskId>
  {

    public string Description { get; private set; }

    private PickAndDeliveryDescription()
    {
      this.Description = "";
    }

    public PickAndDeliveryDescription(string Description)
    {
      this.Description = Description;
    }
  }
}