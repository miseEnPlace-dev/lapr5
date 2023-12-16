using System;
using DDDSample1.Domain.Shared;
using Newtonsoft.Json;

namespace DDDSample1.Domain.Floor
{
  public class FloorId : EntityId
  {

    [JsonConstructor]
    public FloorId(Guid value) : base(value) { }

    public FloorId(string value) : base(value) { }
  }
}