using System;

namespace DDDSample1.Domain.DTO;

public class PickDeliveryRequestDTO : RequestDTO
{

  public string Description { get; set; }
  public string PickupUserId { get; set; }
  public string DeliveryUserId { get; set; }
  public string PickupRoomId { get; set; }

  public string DeliveryRoomId { get; set; }

  public string ConfirmationCode { get; set; }

  public PickDeliveryRequestDTO(string userEmail, string requestedAt, string description, string pickupUserId, string deliveryUserId, string pickupRoomId, string deliveryRoomId, string confirmationCode) : base(userEmail, requestedAt)
  {
    this.Description = description;
    this.PickupUserId = pickupUserId;
    this.DeliveryUserId = deliveryUserId;
    this.PickupRoomId = pickupRoomId;
    this.DeliveryRoomId = deliveryRoomId;
    this.ConfirmationCode = confirmationCode;
  }

  public PickDeliveryRequestDTO(string id, string userEmail, string requestedAt, string state, string description, string pickupUserId, string deliveryUserId, string pickupRoomId, string deliveryRoomId, string confirmationCode) : base(id, userEmail, requestedAt, state)
  {
    this.Description = description;
    this.PickupUserId = pickupUserId;
    this.DeliveryUserId = deliveryUserId;
    this.PickupRoomId = pickupRoomId;
    this.DeliveryRoomId = deliveryRoomId;
    this.ConfirmationCode = confirmationCode;
  }
}