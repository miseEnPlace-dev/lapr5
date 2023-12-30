using System.Collections.Generic;
using DDDSample1.Domain.Shared;
using Microsoft.EntityFrameworkCore;

namespace DDDSample1.Domain.DeviceTasks.PickAndDeliveryTasks
{
  [Owned]
  public class RequestDescription : ValueObject
  {

    public string Value { get; private set; }

    private RequestDescription()
    {
      Value = "";
    }

    public RequestDescription(string description)
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
