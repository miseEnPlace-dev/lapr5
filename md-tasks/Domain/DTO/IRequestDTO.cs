namespace DDDSample1.Domain.DTO;

public interface IRequestDTO
{
  public string Id { get; set; }
  public string UserId { get; set; }
  public string RequestedAt { get; set; }
  public StateEnum State { get; set; }
  public string DeviceTaskId { get; set; }
}
