using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Room
{
  public class Room : Entity<RoomId>, IAggregateRoot
  {

    public string RoomName { get; private set; }

    private Room()
    {
    }

    public Room(string roomName)
    {
      RoomName = roomName;
    }

    public void ChangeRoomName(string roomName)
    {
      RoomName = roomName;
    }
  }
}
