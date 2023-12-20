using DDDSample1.Domain.Room;
using DDDSample1.Domain.User;

namespace DDDSample1.Domain.DeviceTasks.PickAndDeliveryTask
{
  public class PickAndDeliveryTask : DeviceTask
  {
    public PickAndDeliveryDescription Description { get; private set; }
    public ConfirmationCode ConfirmationCode { get; private set; }

    public UserId PickupUserId { get; private set; }
    public UserId DeliveryUserId { get; private set; }
    public RoomId PickupRoomId { get; private set; }

    public RoomId DeliveryRoomId { get; private set; }

    public PickAndDeliveryTask(PickAndDeliveryDescription description, UserId PickupUserId, UserId DeliveryUserId, RoomId PickupRoomId, RoomId DeliveryRoomId)
    {
      Description = description;
      ConfirmationCode = new ConfirmationCode("Pending");
      this.PickupUserId = PickupUserId;
      this.DeliveryUserId = DeliveryUserId;
      this.PickupRoomId = PickupRoomId;
      this.DeliveryRoomId = DeliveryRoomId;
    }

    public void ChangeDescription(PickAndDeliveryDescription description)
    {
      Description = description;
    }

    public void ChangeConfirmationCode(ConfirmationCode ConfirmationCode)
    {
      this.ConfirmationCode = ConfirmationCode;
    }

    public void ChangePickupUserId(User.UserId PickupUserId)
    {
      this.PickupUserId = PickupUserId;
    }

    public void ChangeDeliveryUserId(User.UserId DeliveryUserId)
    {
      this.DeliveryUserId = DeliveryUserId;
    }

    public void ChangePickupRoomId(RoomId PickupRoomId)
    {
      this.PickupRoomId = PickupRoomId;
    }

    public void ChangeDeliveryRoomId(RoomId DeliveryRoomId)
    {
      this.DeliveryRoomId = DeliveryRoomId;
    }

    public override void ExecuteTask()
    {
      throw new System.NotImplementedException();
    }
  }
}
