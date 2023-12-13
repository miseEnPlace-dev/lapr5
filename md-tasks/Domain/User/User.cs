using DDDSample1.Domain.DeviceModel;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.User
{
  public class User : Entity<UserId>, IAggregateRoot
  {

    public string FirstName { get; private set; }
    public string LastName { get; private set; }

    public bool Active { get; private set; }

    private User()
    {
      Active = true;
    }

    public User(string firstName, string lastName)
    {
      FirstName = firstName;
      LastName = lastName;
      Active = true;
    }

    public bool ToggleActive()
    {
      return Active = !Active;
    }
  }
}