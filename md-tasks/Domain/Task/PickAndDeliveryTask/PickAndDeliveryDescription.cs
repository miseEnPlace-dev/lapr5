using System;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.DeviceTasks.PickAndDeliveryTask
{
  public class PickAndDeliveryDescription : ValueObject
  {

    public string Value { get; private set; }

    private PickAndDeliveryDescription()
    {
      Value = "";
    }

    public PickAndDeliveryDescription(string description)
    {
      ValidateDescription(description);
      Value = description;
    }

    private static void ValidateDescription(string description)
    {
      if (description.Length > 255)
      {
        throw new BusinessRuleValidationException("Description cannot be longer than 256 characters.");
      }

      if (string.IsNullOrEmpty(description))
      {
        throw new BusinessRuleValidationException("Description cannot be empty.");
      }
    }

    public override string ToString()
    {
      return Value;
    }

    protected override IEnumerable<object> GetEqualityComponents()
    {
      yield return Value;
    }
  }
}
