using System;
using DDDSample1.Domain.Shared;
using Newtonsoft.Json;

namespace DDDSample1.Domain.Room
{
  public class RoomId : EntityId
  {

    [JsonConstructor]
    public RoomId(Guid value) : base(value) { }

    public RoomId(string value) : base(value) { }
  }
}
