namespace MDTasks.Domain.User;

public class User
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
