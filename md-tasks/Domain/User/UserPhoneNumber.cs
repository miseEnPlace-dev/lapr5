using System.Collections.Generic;
using MDTasks.Domain.Shared;

namespace MDTasks.Domain.User;

public class UserPhoneNumber : ValueObject
{

  public string PhoneNumber { get; private set; }

  private UserPhoneNumber()
  {
    PhoneNumber = "";
  }

  public UserPhoneNumber(string PhoneNumber)
  {
    ValidatePhoneNumber(PhoneNumber);
    this.PhoneNumber = PhoneNumber;
  }

  private static void ValidatePhoneNumber(string PhoneNumber)
  {
    if (string.IsNullOrEmpty(PhoneNumber))
    {
      throw new BusinessRuleValidationException("Phone number cannot be empty or null");
    }
  }

  protected override IEnumerable<object> GetEqualityComponents()
  {
    yield return PhoneNumber;
  }
}
