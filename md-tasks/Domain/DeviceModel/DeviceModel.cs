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
      Active = true;
    }

    public DeviceModel(DeviceModelCode code, DeviceModelName name)
    {
      DeviceModelCode = new DeviceModelCode(code.AsString());
      DeviceModelName = new DeviceModelName(name.AsString());
      Active = true;
    }

    public void ChangeState()
    {
      if (!Active)
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