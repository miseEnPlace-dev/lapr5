using System;

namespace DDDSample1.Domain.DeviceTasks.PickAndDeliveryTask;

public class PickAndDeliveryTaskDto
{
  public Guid Id { get; set; }

  public bool Active { get; set; }

  public string Description { get; set; }
  public string PickupUserId { get; set; }
  public string DeliveryUserId { get; set; }
  public string PickupRoomId { get; set; }

  public string DeliveryRoomId { get; set; }

  public string ConfirmationCode { get; set; }

  public PickAndDeliveryTaskDto(Guid Id, bool Active, string Description, string PickupUserId, string DeliveryUserId, string PickupRoomId, string DeliveryRoomId, string ConfirmationCode)
  {
    this.Id = Id;
    this.Active = Active;
    this.Description = Description;
    this.PickupUserId = PickupUserId;
    this.DeliveryUserId = DeliveryUserId;
    this.PickupRoomId = PickupRoomId;
    this.DeliveryRoomId = DeliveryRoomId;
    this.ConfirmationCode = ConfirmationCode;
  }
}