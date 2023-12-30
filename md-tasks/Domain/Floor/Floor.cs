namespace MDTasks.Domain.Floor;

public class Floor
{

  public string FloorCode { get; private set; }

  private Floor()
  { }

  public Floor(string floorCode)
  {
    FloorCode = floorCode;
  }

  public void ChangeFloorCode(string floorCode)
  {
    FloorCode = floorCode;
  }
}
