using MDTasks.Domain.Floor;
using MDTasks.Domain.Room;
using MDTasks.Domain.User;

namespace MDTasks.Domain.Requests;

public class PickAndDeliveryRequest : Request
{
  public ConfirmationCode ConfirmationCode { get; private set; }
  public UserName PickupUserName { get; private set; }
  public UserName DeliveryUserName { get; private set; }
  public UserPhoneNumber PickupUserPhoneNumber { get; private set; }
  public UserPhoneNumber DeliveryUserPhoneNumber { get; private set; }
  public RoomId PickupRoomId { get; private set; }
  public RoomId DeliveryRoomId { get; private set; }
  public string StartFloorCode { get; private set; }
  public string EndFloorCode { get; private set; }

  public PickAndDeliveryRequest(RequestId id, RequestDescription description, UserName pickupUserName, UserName deliveryUserName, UserPhoneNumber pickupUserPhoneNumber, UserPhoneNumber deliveryUserPhoneNumber, RoomId pickupRoomId, RoomId deliveryRoomId, ConfirmationCode confirmationCode, int startCoordinateX, int startCoordinateY, int endCoordinateX, int endCoordinateY, string startFloorCode, string endFloorCode, UserId userId) : base(id, startCoordinateX, startCoordinateY, endCoordinateX, endCoordinateY, userId, description)
  {
    ConfirmationCode = confirmationCode;
    PickupUserName = pickupUserName;
    DeliveryUserName = deliveryUserName;
    PickupRoomId = pickupRoomId;
    DeliveryRoomId = deliveryRoomId;
    PickupUserPhoneNumber = pickupUserPhoneNumber;
    DeliveryUserPhoneNumber = deliveryUserPhoneNumber;
    StartFloorCode = startFloorCode;
    EndFloorCode = endFloorCode;
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
