using System.Collections.Generic;

public class PathDTO
{
  public List<object> Route { get; set; }

  public PathDTO(List<object> route)
  {
    Route = route;

  }
  public PathDTO(object[] route)
  {
    Route = new List<object>(route);
  }

  public PathDTO()
  {
    Route = new List<object>();
  }

  public void AppendRoute(PathDTO route)
  {
    Route.AddRange(route.Route);
  }
}
