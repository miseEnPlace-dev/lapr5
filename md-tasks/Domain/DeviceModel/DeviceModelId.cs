using System;
using DDDSample1.Domain.Shared;
using Newtonsoft.Json;

namespace DDDSample1.Domain.DeviceModel
{
  public class DeviceModelId : EntityId
  {

    [JsonConstructor]
    public DeviceModelId(Guid value) : base(value) { }

    public DeviceModelId(string value) : base(value) { }

    public DeviceModelId() : base(Guid.NewGuid()) { }
  }
}