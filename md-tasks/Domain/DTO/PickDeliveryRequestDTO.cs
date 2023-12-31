using Newtonsoft.Json;

namespace DDDSample1.Domain.DTO;

public class PickAndDeliveryRequestDTO : RequestDTO
{

  public string Description { get; set; }
  public string PickupUserName { get; set; }
  public string DeliveryUserName { get; set; }
  public string PickupUserPhoneNumber { get; set; }
  public string DeliveryUserPhoneNumber { get; set; }
  public string PickupRoomId { get; set; }
  public string DeliveryRoomId { get; set; }
  public string ConfirmationCode { get; set; }

  public string StartFloorCode { get; set; }
  public string EndFloorCode { get; set; }

  [JsonConstructor]
  public PickAndDeliveryRequestDTO(string description, string pickupUserName, string deliveryUserName, string pickupUserPhoneNumber, string deliveryUserPhoneNumber, string pickupRoomId, string deliveryRoomId, string confirmationCode, string userId) : base(userId)
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

  public PickAndDeliveryRequestDTO(string id, string description, string pickupUserName, string deliveryUserName, string pickupUserPhoneNumber, string deliveryUserPhoneNumber, string pickupRoomId, string deliveryRoomId, string confirmationCode, int startCoordinateX, int startCoordinateY, int endCoordinateX, int endCoordinateY, string startFloorCode, string endFloorCode, string userId, string state, string requestedAt) : base(id, "pick_delivery", userId, state, requestedAt, startCoordinateX, startCoordinateY, endCoordinateX, endCoordinateY)
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
