using System;
using DDDSample1.Domain.Shared;
using Newtonsoft.Json;

namespace DDDSample1.Domain.User
{
  public class UserId : EntityId
  {

    [JsonConstructor]
    public UserId(Guid value) : base(value) { }

    [JsonConstructor]
    public UserId(string value) : base(value) { }
  }
}