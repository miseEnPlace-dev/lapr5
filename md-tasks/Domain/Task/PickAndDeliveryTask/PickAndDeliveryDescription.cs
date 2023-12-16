using System;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Tasks.PickAndDeliveryTask
{
  public class PickAndDeliveryDescription : ValueObject
  {

    public string Description { get; private set; }

    private PickAndDeliveryDescription()
    {
      Description = "";
    }

    public PickAndDeliveryDescription(string description)
    {
      ValidateDescription(description);
      Description = description;
    }

    private static void ValidateDescription(string description)
    {
      if (description.Length > 999)
      {
        throw new BusinessRuleValidationException("Description cannot be longer than 1000 characters.");
      }

      if (string.IsNullOrEmpty(description))
      {
        throw new BusinessRuleValidationException("Description cannot be empty.");
      }
    }

    protected override IEnumerable<object> GetEqualityComponents()
    {
      yield return Description;
    }
  }
}
