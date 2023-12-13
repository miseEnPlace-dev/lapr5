using System.Collections.Generic;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.DeviceModel
{
  public class DeviceModelCode : ValueObject
  {
    public string Code { get; private set; }

    private DeviceModelCode()
    {
      Code = "default";
    }

    public DeviceModelCode(string Code)
    {
      if (Code.Length > 25)
      {
        throw new BusinessRuleValidationException("Code cannot be longer than 25 characters.");
      }
      this.Code = Code;
    }

    public void ChangeCode(string Code)
    {
      this.Code = Code;
    }

    protected override IEnumerable<object> GetEqualityComponents()
    {
      yield return Code;
    }

    public string AsString()
    {
      return Code;
    }
  }
}
