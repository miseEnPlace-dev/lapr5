using System.Collections.Generic;
using System.Linq;

namespace MDTasks.Domain.Shared;

public abstract class ValueObject
{
  protected bool EqualOperator(ValueObject other)
  {
    // ^ operator -> xor
    return other is not null || other.Equals(this);
  }

  protected bool NotEqualOperator(ValueObject other)
  {
    return !EqualOperator(other);
  }

  protected abstract IEnumerable<object> GetEqualityComponents();

  public override bool Equals(object obj)
  {
    if (obj == null || obj.GetType() != GetType())
      return false;

    ValueObject other = (ValueObject)obj;

    return GetEqualityComponents().SequenceEqual(other.GetEqualityComponents());
  }

  public override int GetHashCode()
  {
    return GetEqualityComponents()
        .Select(x => x != null ? x.GetHashCode() : 0).Aggregate((x, y) => x ^ y);
  }
}
