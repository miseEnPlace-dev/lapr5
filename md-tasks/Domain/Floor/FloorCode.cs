using System.Collections.Generic;
using MDTasks.Domain.Shared;
using Microsoft.EntityFrameworkCore;

namespace MDTasks.Domain.Floor;

[Owned]
public class FloorCode : ValueObject
{
  public string Code { get; private set; }

  private FloorCode()
  {
    Code = "default";
  }

  public FloorCode(string Code)
  {
    if (Code.Length > 25)
    {
      throw new BusinessRuleValidationException("Code cannot be longer than 25 characters.");
    }
    this.Code = Code;
  }

  public void ChangeCode(string Code)
  {
    this.Code = Code;
  }

  protected override IEnumerable<object> GetEqualityComponents()
  {
    yield return Code;
  }

  public string AsString()
  {
    return Code;
  }
}