namespace MDTasks.Domain.Utils;

public class Coordinates
{
  public int X { get; private set; }
  public int Y { get; private set; }

  public Coordinates(int x, int y)
  {
    X = x;
    Y = y;
  }
}
