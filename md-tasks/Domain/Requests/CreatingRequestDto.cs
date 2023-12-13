namespace DDDSample1.Domain.Requests
{
  public class CreatingRequestDto
  {
    public string State { get; set; }

    public string DeviceModelId { get; set; }

    public string UserId { get; set; }

    public CreatingRequestDto(string state, string deviceModelId, string userId)
    {
      State = state;
      DeviceModelId = deviceModelId;
      UserId = userId;
    }
  }
}