using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Floor
{
  public class Floor : Entity<FloorId>, IAggregateRoot
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
}
