using DDDSample1.Domain.Room;
using DDDSample1.Domain.User;

namespace DDDSample1.Domain.DeviceTasks.PickAndDeliveryTask
{
  public class PickAndDeliveryTask : DeviceTask
  {
    public TaskDescription Description { get; private set; }
    public ConfirmationCode ConfirmationCode { get; private set; }
    public UserName PickupUserName { get; private set; }
    public UserName DeliveryUserName { get; private set; }

    public UserPhoneNumber PickupUserPhoneNumber { get; private set; }
    public UserPhoneNumber DeliveryUserPhoneNumber { get; private set; }
    public RoomId PickupRoomId { get; private set; }
    public RoomId DeliveryRoomId { get; private set; }

    public int StartCoordinateX { get; private set; }
    public int StartCoordinateY { get; private set; }
    public int EndCoordinateX { get; private set; }
    public int EndCoordinateY { get; private set; }

    public string StartFloorCode { get; private set; }
    public string EndFloorCode { get; private set; }

    public PickAndDeliveryTask(DeviceTaskId Id, TaskDescription description, UserName pickupUserName, UserName deliveryUserName, UserPhoneNumber pickupUserPhoneNumber, UserPhoneNumber deliveryUserPhoneNumber, RoomId pickupRoomId, RoomId deliveryRoomId, ConfirmationCode confirmationCode, int StartCoordinateX, int StartCoordinateY, int EndCoordinateX, int EndCoordinateY, string startFloorCode, string endFloorCode) : base(Id)
    {
      Description = description;
      ConfirmationCode = confirmationCode;
      PickupUserName = pickupUserName;
      DeliveryUserName = deliveryUserName;
      PickupRoomId = pickupRoomId;
      DeliveryRoomId = deliveryRoomId;
      PickupUserPhoneNumber = pickupUserPhoneNumber;
      DeliveryUserPhoneNumber = deliveryUserPhoneNumber;
      this.StartCoordinateX = StartCoordinateX;
      this.StartCoordinateY = StartCoordinateY;
      this.EndCoordinateX = EndCoordinateX;
      this.EndCoordinateY = EndCoordinateY;
      this.StartFloorCode = startFloorCode;
      this.EndFloorCode = endFloorCode;
    }

    public void ChangeDescription(TaskDescription description)
    {
      Description = description;
    }

    public void ChangeConfirmationCode(ConfirmationCode ConfirmationCode)
    {
      this.ConfirmationCode = ConfirmationCode;
    }

    public void ChangePickupUserName(UserName PickupUserName)
    {
      this.PickupUserName = PickupUserName;
    }

    public void ChangeDeliveryUserName(UserName DeliveryUserName)
    {
      this.DeliveryUserName = DeliveryUserName;
    }

    public void ChangePickupUserPhoneNumber(UserPhoneNumber PickupUserPhoneNumber)
    {
      this.PickupUserPhoneNumber = PickupUserPhoneNumber;
    }

    public void ChangeDeliveryUserPhoneNumber(UserPhoneNumber DeliveryUserPhoneNumber)
    {
      this.DeliveryUserPhoneNumber = DeliveryUserPhoneNumber;
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
