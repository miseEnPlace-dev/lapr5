using DDDSample1.Domain.Shared;
using Microsoft.EntityFrameworkCore;

namespace DDDSample1.Domain.Floor
{
  [Owned]
  public class FloorId : EntityId
  {
    public FloorId(string value) : base(value) { }
  }
}
