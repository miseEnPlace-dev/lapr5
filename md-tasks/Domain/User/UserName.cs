using System.Collections.Generic;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.User
{
  public class UserName : ValueObject
  {

    public string Name { get; private set; }

    private UserName()
    {
      Name = "";
    }

    public UserName(string Name)
    {
      ValidateName(Name);
      this.Name = Name;
    }

    private static void ValidateName(string Name)
    {
      if (string.IsNullOrEmpty(Name))
      {
        throw new BusinessRuleValidationException("Name cannot be empty or null");
      }
    }

    protected override IEnumerable<object> GetEqualityComponents()
    {
      yield return Name;
    }
  }
}
