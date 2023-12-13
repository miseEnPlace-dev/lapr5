using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.DeviceModel
{
  public class DeviceModel : Entity<DeviceModelId>, IAggregateRoot
  {

    public DeviceModelCode DeviceModelCode { get; private set; }
    public DeviceModelName DeviceModelName { get; private set; }

    public bool Active { get; private set; }

    private DeviceModel()
    {
      this.Active = true;
    }

    public void ChangeState()
    {
      if (!this.Active)
      {
        throw new BusinessRuleValidationException("Request is not active.");
      }
    }

    public bool ToggleActive()
    {
      return Active = !Active;
    }
  }
}