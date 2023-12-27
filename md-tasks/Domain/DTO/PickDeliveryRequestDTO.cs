using Newtonsoft.Json;

namespace DDDSample1.Domain.DTO;

public class PickDeliveryRequestDTO : RequestDTO
{

  public string Description { get; set; }
  public string PickupUserName { get; set; }
  public string DeliveryUserName { get; set; }
  public string PickupUserPhoneNumber { get; set; }
  public string DeliveryUserPhoneNumber { get; set; }
  public string PickupRoomId { get; set; }
  public string DeliveryRoomId { get; set; }
  public string ConfirmationCode { get; set; }
  public double StartCoordinateX { get; set; }
  public double StartCoordinateY { get; set; }
  public double EndCoordinateX { get; set; }
  public double EndCoordinateY { get; set; }
  public string StartFloorCode { get; set; }
  public string EndFloorCode { get; set; }

  [JsonConstructor]
  public PickDeliveryRequestDTO(string userId, string requestedAt, string description, string pickupUserName, string deliveryUserName, string pickupUserPhoneNumber, string deliveryUserPhoneNumber, string pickupRoomId, string deliveryRoomId, string confirmationCode) : base(userId, requestedAt)
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

  public PickDeliveryRequestDTO(string id, string userId, string description, string requestedAt, string state, string pickupUserName, string deliveryUserName, string pickupUserPhoneNumber, string deliveryUserPhoneNumber, string pickupRoomId, string deliveryRoomId, string deviceTaskId, string confirmationCode, double startCoordinateX, double startCoordinateY, double endCoordinateX, double endCoordinateY, string startFloorCode, string endFloorCode) : base(id, "pick_delivery", userId, requestedAt, state, deviceTaskId)
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
