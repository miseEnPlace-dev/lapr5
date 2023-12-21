namespace DDDSample1.Domain.DTO;

public interface IPickDeliveryRequestDTO : IRequestDTO
{
  public string Description { get; set; }
  public string PickupUserId { get; set; }
  public string DeliveryUserId { get; set; }
  public string PickupRoomId { get; set; }
  public string DeliveryRoomId { get; set; }
  public string ConfirmationCode { get; set; }
}
