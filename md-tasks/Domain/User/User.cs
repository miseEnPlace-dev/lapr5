using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.User
{
  public class User : Entity<UserId>, IAggregateRoot
  {

    public string FirstName { get; private set; }
    public string LastName { get; private set; }

    public UserEmail UserEmail { get; private set; }

    public bool Active { get; private set; }

    private User()
    {
      Active = true;
    }

    public User(string firstName, string lastName, UserEmail userEmail)
    {
      FirstName = firstName;
      LastName = lastName;
      UserEmail = userEmail;
      Active = true;
    }

    public bool ToggleActive()
    {
      return Active = !Active;
    }
  }
}
