using System;

namespace DDDSample1.Domain.Shared
{
  /// <summary>
  /// Base class for entities.
  /// </summary>
  public abstract class EntityId : IEquatable<EntityId>, IComparable<EntityId>
  {
    protected Guid ObjValue { get; }

    public string Value
    {
      get
      {
        return AsString();
      }
    }

    protected EntityId(string value)
    {
      ObjValue = CreateFromString((string)value);
    }

    protected EntityId(Guid value)
    {
      ObjValue = CreateFromString(value.ToString());
    }


    protected Guid CreateFromString(string text)
    {
      return new Guid(text);
    }

    public string AsString()
    {
      Guid obj = ObjValue;
      return obj.ToString();
    }

    public Guid AsGuid()
    {
      return ObjValue;
    }

    public override bool Equals(object obj)
    {
      if (obj is null) return false;
      return obj is EntityId other && Equals(other);
    }

    public override int GetHashCode()
    {
      return Value.GetHashCode();
    }

    public bool Equals(EntityId other)
    {
      if (other == null) return false;
      if (GetType() != other.GetType()) return false;
      return Value == other.Value;
    }

    public int CompareTo(EntityId other)
    {
      if (other == null) return -1;
      return Value.CompareTo(other.Value);
    }

    public static bool operator ==(EntityId obj1, EntityId obj2)
    {
      if (Equals(obj1, null)) return Equals(obj2, null);
      return obj1.Equals(obj2);
    }

    public static bool operator !=(EntityId x, EntityId y)
    {
      return !(x == y);
    }
  }

}
