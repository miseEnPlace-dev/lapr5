using System;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Requests
{
  public class RequestId : EntityId
  {

    public RequestId(Guid value) : base(value)
    {
    }

    public RequestId(String value) : base(value)
    {

    }

    override
    protected Object createFromString(String text)
    {
      return text;
    }
    override
    public String AsString()
    {
      return (String)base.Value;
    }
  }
}