using Newtonsoft.Json;

namespace DDDSample1.Domain.DTO;

public class PickDeliveryTaskDTO : TaskDTO
{

  public string Description { get; set; }
  public string PickupUserName { get; set; }
  public string DeliveryUserName { get; set; }
  public string PickupUserPhoneNumber { get; set; }
  public string DeliveryUserPhoneNumber { get; set; }
  public string PickupRoomId { get; set; }
  public string DeliveryRoomId { get; set; }
  public string ConfirmationCode { get; set; }
  public int StartCoordinateX { get; set; }
  public int StartCoordinateY { get; set; }
  public int EndCoordinateX { get; set; }
  public int EndCoordinateY { get; set; }
  public string StartFloorCode { get; set; }
  public string EndFloorCode { get; set; }

  [JsonConstructor]
  public PickDeliveryTaskDTO(string requestedAt, string description, string pickupUserName, string deliveryUserName, string pickupUserPhoneNumber, string deliveryUserPhoneNumber, string pickupRoomId, string deliveryRoomId, string confirmationCode, string deviceId, string deviceTaskId) : base(requestedAt, deviceId, deviceTaskId)
  {
    Description = description;
    PickupUserName = pickupUserName;
    DeliveryUserName = deliveryUserName;
    PickupUserPhoneNumber = pickupUserPhoneNumber;
    DeliveryUserPhoneNumber = deliveryUserPhoneNumber;
    PickupRoomId = pickupRoomId;
    DeliveryRoomId = deliveryRoomId;
    ConfirmationCode = confirmationCode;
  }

  public PickDeliveryTaskDTO(string id, string description, string requestedAt, string pickupUserName, string deliveryUserName, string pickupUserPhoneNumber, string deliveryUserPhoneNumber, string pickupRoomId, string deliveryRoomId, string deviceTaskId, string confirmationCode, int startCoordinateX, int startCoordinateY, int endCoordinateX, int endCoordinateY, string startFloorCode, string endFloorCode, string deviceId) : base(id, "pick_delivery", requestedAt, deviceTaskId, deviceId)
  {
    Description = description;
    PickupUserName = pickupUserName;
    DeliveryUserName = deliveryUserName;
    PickupUserPhoneNumber = pickupUserPhoneNumber;
    DeliveryUserPhoneNumber = deliveryUserPhoneNumber;
    PickupRoomId = pickupRoomId;
    DeliveryRoomId = deliveryRoomId;
    ConfirmationCode = confirmationCode;
    StartCoordinateX = startCoordinateX;
    StartCoordinateY = startCoordinateY;
    EndCoordinateX = endCoordinateX;
    EndCoordinateY = endCoordinateY;
    StartFloorCode = startFloorCode;
    EndFloorCode = endFloorCode;
  }
}
