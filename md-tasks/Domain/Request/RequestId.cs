using System;
using DDDSample1.Domain.Shared;
using Newtonsoft.Json;

namespace DDDSample1.Domain.Requests
{
  public class RequestId : EntityId
  {

    [JsonConstructor]
    public RequestId(Guid value) : base(value) { }

    public RequestId(string value) : base(value) { }

    public RequestId() : base(Guid.NewGuid()) { }

  }
}
