using Newtonsoft.Json;

namespace MDTasks.DTO;

public abstract class RequestDTO
{
  public string Id { get; set; }
  public string Type { get; set; }
  public string UserId { get; set; }
  public string State { get; set; }
  public string RequestedAt { get; set; }
  public int StartCoordinateX { get; set; }
  public int StartCoordinateY { get; set; }
  public int EndCoordinateX { get; set; }
  public int EndCoordinateY { get; set; }

  [JsonConstructor]
  public RequestDTO(string userId)
  {
    UserId = userId;
  }

  public RequestDTO(string id, string type, string userId, string state, string requestedAt, int startCoordinateX, int startCoordinateY, int endCoordinateX, int endCoordinateY) : this(userId)
  {
    Id = id;
    Type = type;
    State = state;
    RequestedAt = requestedAt;
    StartCoordinateX = startCoordinateX;
    StartCoordinateY = startCoordinateY;
    EndCoordinateX = endCoordinateX;
    EndCoordinateY = endCoordinateY;
  }
}
