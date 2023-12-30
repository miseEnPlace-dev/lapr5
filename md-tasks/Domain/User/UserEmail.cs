using System.Collections.Generic;
using MDTasks.Domain.Shared;

namespace MDTasks.Domain.User;

public class UserEmail : ValueObject
{

  public string Email { get; private set; }

  private UserEmail()
  {
    Email = "";
  }

  public UserEmail(string email)
  {
    ValidateEmail(email);
    Email = email;
  }

  private static void ValidateEmail(string email)
  {
    if (email.Length < 4)
    {
      throw new BusinessRuleValidationException("Email must at least 4 characters");
    }
  }

  protected override IEnumerable<object> GetEqualityComponents()
  {
    yield return Email;
  }
}
