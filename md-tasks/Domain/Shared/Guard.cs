using System;

namespace MDTasks.Domain.Shared;

public class Guard
{
  // create a guard class with static methods to handle common validation
  public static void AgainstNull(object obj, string message)
  {
    if (obj == null)
    {
      throw new ArgumentNullException(message);
    }
  }

  public static void AgainstNullOrEmpty(string str, string message)
  {
    if (string.IsNullOrEmpty(str))
    {
      throw new ArgumentNullException(message);
    }
  }

  public static void AgainstNullBulk(string message, params object[] objs)
  {
    foreach (var obj in objs)
    {
      if (obj == null)
      {
        throw new ArgumentNullException(obj + " " + message);
      }
    }
  }

  public static void AgainstNullOrEmptyBulk(string message, params string[] strs)
  {
    foreach (var str in strs)
    {
      if (string.IsNullOrEmpty(str))
      {
        throw new ArgumentNullException(str + " " + message);
      }
    }
  }
}
