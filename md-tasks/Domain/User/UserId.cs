namespace DDDSample1.Domain.User
{
  public class UserId
  {

    public string Value { get; private set; }

    public UserId(string value)
    {
      Value = value;
    }
  }
}
