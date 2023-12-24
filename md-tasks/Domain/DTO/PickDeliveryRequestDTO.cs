using Newtonsoft.Json;

namespace DDDSample1.Domain.DTO;

public class PickDeliveryRequestDTO : RequestDTO
{

  public string Description { get; set; }
  public string PickupUserId { get; set; }
  public string DeliveryUserId { get; set; }
  public string PickupRoomId { get; set; }

  public string DeliveryRoomId { get; set; }

  public string ConfirmationCode { get; set; }

  [JsonConstructor]
  public PickDeliveryRequestDTO(string userId, string requestedAt, string description, string pickupUserId, string deliveryUserId, string pickupRoomId, string deliveryRoomId, string confirmationCode) : base(userId, requestedAt)
  {
    this.Description = description;
    this.PickupUserId = pickupUserId;
    this.DeliveryUserId = deliveryUserId;
    this.PickupRoomId = pickupRoomId;
    this.DeliveryRoomId = deliveryRoomId;
    this.ConfirmationCode = confirmationCode;
  }

  public PickDeliveryRequestDTO(string id, string userId, string requestedAt, StateEnum state, string description, string pickupUserId, string deliveryUserId, string pickupRoomId, string deliveryRoomId, string confirmationCode, string deviceTaskId) : base(id, userId, requestedAt, state, deviceTaskId)
  {
    this.Description = description;
    this.PickupUserId = pickupUserId;
    this.DeliveryUserId = deliveryUserId;
    this.PickupRoomId = pickupRoomId;
    this.DeliveryRoomId = deliveryRoomId;
    this.ConfirmationCode = confirmationCode;
  }
}