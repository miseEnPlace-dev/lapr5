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
    public UserId(string value) : base(ParseGuid(value)) { }

    public UserId() : base(Guid.NewGuid()) { }

    private static Guid ParseGuid(string value)
    {
      if (string.IsNullOrEmpty(value))
      {
        throw new ArgumentException("UserId string cannot be null or empty.");
      }

      if (Guid.TryParse(value, out var guidValue))
      {
        return guidValue;
      }

      throw new ArgumentException("Invalid UserId format. It should be a valid GUID string.");
    }
  }
}