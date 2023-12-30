using System.Collections.Generic;

namespace MDTasks.Domain.Path;

public class PathDTO
{
  public string taskId { get; set; }
  public List<object> Route { get; set; }

  public PathDTO(string taskId, List<object> route)
  {
    this.taskId = taskId;
    Route = route;
  }

  public PathDTO()
  {
    Route = new List<object>();
  }
}
