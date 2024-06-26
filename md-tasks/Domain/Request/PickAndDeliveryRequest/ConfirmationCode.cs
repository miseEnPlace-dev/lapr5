using System.Collections.Generic;
using MDTasks.Domain.Shared;
using Microsoft.EntityFrameworkCore;

namespace MDTasks.Domain.Request;

[Owned]
public class ConfirmationCode : ValueObject
{

  public string Code { get; private set; }

  private ConfirmationCode()
  {
    Code = "";
  }

  public ConfirmationCode(string code)
  {
    ValidateCode(code);
    Code = code;
  }

  private static void ValidateCode(string code)
  {
    if (code.Length < 4 || code.Length > 6 || string.IsNullOrEmpty(code))
    {
      throw new BusinessRuleValidationException("Confirmation code must at least 4 characters and at most 6 characters.");
    }
  }

  protected override IEnumerable<object> GetEqualityComponents()
  {
    yield return Code;
  }
}
