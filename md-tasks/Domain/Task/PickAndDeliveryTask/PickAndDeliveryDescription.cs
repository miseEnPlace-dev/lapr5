using System;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Task.PickAndDeliveryTask
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
      Description = description;
    }

    private void ValidateDescription(string description)
    {
      if (description.Length > 255)
      {
        throw new BusinessRuleValidationException("Description cannot be longer than 255 characters.");
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