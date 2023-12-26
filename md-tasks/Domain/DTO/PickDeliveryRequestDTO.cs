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

  [JsonConstructor]
  public PickDeliveryRequestDTO(string userId, string requestedAt, string description, string pickupUserName, string deliveryUserName, string pickupUserPhoneNumber, string deliveryUserPhoneNumber, string pickupRoomId, string deliveryRoomId, string confirmationCode) : base(userId, requestedAt)
  {
    this.Description = description;
    this.PickupUserName = pickupUserName;
    this.DeliveryUserName = deliveryUserName;
    this.PickupUserPhoneNumber = pickupUserPhoneNumber;
    this.DeliveryUserPhoneNumber = deliveryUserPhoneNumber;
    this.PickupRoomId = pickupRoomId;
    this.DeliveryRoomId = deliveryRoomId;
    this.ConfirmationCode = confirmationCode;
  }

  public PickDeliveryRequestDTO(string id, string userId, string description, string requestedAt, StateEnum state, string pickupUserName, string deliveryUserName, string pickupUserPhoneNumber, string deliveryUserPhoneNumber, string pickupRoomId, string deliveryRoomId, string deviceTaskId, string confirmationCode) : base(id, userId, requestedAt, state, deviceTaskId)
  {
    this.Description = description;
    this.PickupUserName = pickupUserName;
    this.DeliveryUserName = deliveryUserName;
    this.PickupUserPhoneNumber = pickupUserPhoneNumber;
    this.DeliveryUserPhoneNumber = deliveryUserPhoneNumber;
    this.PickupRoomId = pickupRoomId;
    this.DeliveryRoomId = deliveryRoomId;
    this.ConfirmationCode = confirmationCode;
  }
}