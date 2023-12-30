using Microsoft.EntityFrameworkCore;

namespace MDTasks.Domain.Floor;

[Owned]
public class FloorId
{

  public string Value { get; private set; }

  public FloorId(string value)
  {
    Value = value;
  }
}
