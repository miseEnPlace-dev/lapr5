using System.Collections.Generic;
using MDTasks.Domain.Shared;

namespace MDTasks.Domain.DeviceModel;

public class DeviceModelName : ValueObject
{
  public string Name { get; private set; }

  private DeviceModelName()
  {
    Name = "default";
  }

  public DeviceModelName(string Name)
  {
    if (Name.Length < 1)
    {
      throw new BusinessRuleValidationException("Name cannot be shorter than 1 characters.");
    }
    this.Name = Name;
  }

  public void ChangeName(string Name)
  {
    this.Name = Name;
  }

  protected override IEnumerable<object> GetEqualityComponents()
  {
    yield return Name;
  }

  public string AsString()
  {
    return Name;
  }
}
