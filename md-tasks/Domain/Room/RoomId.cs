namespace DDDSample1.Domain.Room
{
  public class RoomId
  {

    public string Value { get; private set; }

    public RoomId(string value)
    {
      Value = value;
    }
  }
}
