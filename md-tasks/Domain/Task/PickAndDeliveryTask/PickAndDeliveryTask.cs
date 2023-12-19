using DDDSample1.Domain.Room;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.User;

namespace DDDSample1.Domain.DeviceTasks.PickAndDeliveryTask
{
  public class PickAndDeliveryTask : DeviceTask
  {
    public PickAndDeliveryDescription PickAndDeliveryDescription { get; private set; }
    public ConfirmationCode ConfirmationCode { get; private set; }

    public UserEmail PickupUserId { get; private set; }
    public UserEmail DeliveryUserId { get; private set; }
    public RoomId PickupRoomId { get; private set; }

    public RoomId DeliveryRoomId { get; private set; }

    public PickAndDeliveryTask(PickAndDeliveryDescription PickAndDeliveryDescription, UserEmail PickupUserId, UserEmail DeliveryUserId, RoomId PickupRoomId, RoomId DeliveryRoomId)
    {
      this.PickAndDeliveryDescription = PickAndDeliveryDescription;
      ConfirmationCode = new ConfirmationCode("Pending");
      this.PickupUserId = PickupUserId;
      this.DeliveryUserId = DeliveryUserId;
      this.PickupRoomId = PickupRoomId;
      this.DeliveryRoomId = DeliveryRoomId;
    }

    public void ChangeDescription(PickAndDeliveryDescription PickAndDeliveryDescription)
    {
      this.PickAndDeliveryDescription = PickAndDeliveryDescription;
    }

    public void ChangeConfirmationCode(ConfirmationCode ConfirmationCode)
    {
      this.ConfirmationCode = ConfirmationCode;
    }

    public void ChangePickupUserId(User.UserEmail PickupUserId)
    {
      this.PickupUserId = PickupUserId;
    }

    public void ChangeDeliveryUserId(User.UserEmail DeliveryUserId)
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
