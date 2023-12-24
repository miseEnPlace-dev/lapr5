using DDDSample1.Domain.Shared;
using Microsoft.EntityFrameworkCore;

namespace DDDSample1.Domain.Floor
{
  [Owned]
  public class FloorId
  {

    public string Value { get; private set; }

    public FloorId(string value)
    {
      this.Value = value;
    }
  }
}
