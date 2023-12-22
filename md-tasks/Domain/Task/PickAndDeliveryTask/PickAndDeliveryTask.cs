using DDDSample1.Domain.Room;
using DDDSample1.Domain.User;

namespace DDDSample1.Domain.DeviceTasks.PickAndDeliveryTask
{
  public class PickAndDeliveryTask : DeviceTask
  {
    public TaskDescription Description { get; private set; }
    public ConfirmationCode ConfirmationCode { get; private set; }
    public UserId PickupUserId { get; private set; }
    public UserId DeliveryUserId { get; private set; }
    public RoomId PickupRoomId { get; private set; }
    public RoomId DeliveryRoomId { get; private set; }

    public PickAndDeliveryTask(DeviceTaskId Id, TaskDescription description, UserId pickupUserId, UserId deliveryUserId, RoomId pickupRoomId, RoomId deliveryRoomId) : base(Id)
    {
      Description = description;
      ConfirmationCode = new ConfirmationCode("Pending");
      PickupUserId = pickupUserId;
      DeliveryUserId = deliveryUserId;
      PickupRoomId = pickupRoomId;
      DeliveryRoomId = deliveryRoomId;
    }

    public void ChangeDescription(TaskDescription description)
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
