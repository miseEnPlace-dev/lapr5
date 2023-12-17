using DDDSample1.Domain.DeviceModel;
using DDDSample1.Domain.User;

namespace DDDSample1.Domain.Requests
{
  public class CreatingRequestDto
  {
    public RequestState State { get; set; }

    public DeviceModelId DeviceModelId { get; set; }

    public UserId UserId { get; set; }

    public CreatingRequestDto(RequestState state, DeviceModelId deviceModelId, UserId userId)
    {
      State = state;
      DeviceModelId = deviceModelId;
      UserId = userId;
    }
  }
}