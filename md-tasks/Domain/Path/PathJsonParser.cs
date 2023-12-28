using System;
using System.Linq;
using System.Text.Json;

public class PathJsonParser
{
  public static PathDTO Parse(string json)
  {
    PathDTO path = new();

    string[] jsonLines = json.Split("\n");
    foreach (string line in jsonLines.Skip(1).Take(jsonLines.Length - 2))
    {
      string l = line.Trim();
      if (line.EndsWith(","))
        l = line.Remove(line.Length - 1).Trim();

      try
      {
        if (l.StartsWith("{\"floor1\":"))
        {
          RouteAction action = JsonSerializer.Deserialize<RouteAction>(l);
          path.Route.Add(action);
        }
        else
        {
          RouteCell cell = JsonSerializer.Deserialize<RouteCell>(l);
          path.Route.Add(cell);
        }
      }
      catch (Exception)
      {
        Console.WriteLine($"Error parsing line: {l}");
      }
    }

    return path;
  }
}
