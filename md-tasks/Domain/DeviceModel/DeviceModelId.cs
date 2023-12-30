using System;
using MDTasks.Domain.Shared;
using Newtonsoft.Json;

namespace MDTasks.Domain.DeviceModel;

public class DeviceModelId : EntityId
{
  [JsonConstructor]
  public DeviceModelId(Guid value) : base(value) { }

  public DeviceModelId(string value) : base(ParseGuid(value)) { }

  public DeviceModelId() : base(Guid.NewGuid()) { }

  private static Guid ParseGuid(string value)
  {
    if (string.IsNullOrEmpty(value))
    {
      throw new ArgumentException("DeviceModelId string cannot be null or empty.");
    }

    if (Guid.TryParse(value, out var guidValue))
    {
      return guidValue;
    }

    throw new ArgumentException("Invalid DeviceModelId format. It should be a valid GUID string.");
  }
}
