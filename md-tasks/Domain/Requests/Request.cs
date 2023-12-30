using System;
using MDTasks.Domain.Shared;
using MDTasks.Domain.User;
using MDTasks.Domain.Utils;

namespace MDTasks.Domain.Requests;

public abstract class Request : Entity<RequestId>, IAggregateRoot
{
  public int StartCoordinateX { get; private set; }
  public int StartCoordinateY { get; private set; }
  public int EndCoordinateX { get; private set; }
  public int EndCoordinateY { get; private set; }

  public UserId UserId { get; private set; }
  public RequestDescription Description { get; private set; }

  public DateTime RequestedAt { get; private set; }
  public RequestState State { get; private set; }

  public Request(RequestId id, int startCoordinateX, int startCoordinateY, int endCoordinateX, int endCoordinateY, UserId userId, RequestDescription description)
  {
    Id = id;
    StartCoordinateX = startCoordinateX;
    StartCoordinateY = startCoordinateY;
    EndCoordinateX = endCoordinateX;
    EndCoordinateY = endCoordinateY;
    UserId = userId;
    Description = description;
    RequestedAt = DateTime.Now;
    State = new RequestState(StateEnum.Pending);
  }

  public abstract void ExecuteTask();

  public void ChangeDescription(RequestDescription description)
  {
    Description = description;
  }

  public Coordinates GetStartCoordinates()
  {
    return new Coordinates(StartCoordinateX, StartCoordinateY);
  }

  public Coordinates GetEndCoordinates()
  {
    return new Coordinates(EndCoordinateX, EndCoordinateY);
  }
}
