namespace DDDSample1.Domain.DTO;

public interface ISurveillanceRequestDTO : IRequestDTO
{
  public string ContactEmail { get; set; }
  public string FloorCode { get; set; }
}
