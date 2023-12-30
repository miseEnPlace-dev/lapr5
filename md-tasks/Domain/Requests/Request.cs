using System;
using MDTasks.Domain.Shared;
using MDTasks.Domain.User;
using MDTasks.Domain.Utils;

namespace MDTasks.Domain.Requests;

public abstract class Request : Entity<RequestId>, IAggregateRoot
{
  public int StartCoordinatesX { get; private set; }
  public int StartCoordinatesY { get; private set; }
  public int EndCoordinatesX { get; private set; }
  public int EndCoordinatesY { get; private set; }

  public UserId UserId { get; private set; }
  public RequestDescription Description { get; private set; }

  public DateTime RequestedAt { get; private set; }
  public RequestState State { get; private set; }

  public Request(RequestId id, int startCoordinatesX, int startCoordinatesY, int endCoordinatesX, int endCoordinatesY, UserId userId, RequestDescription description)
  {
    Id = id;
    StartCoordinatesX = startCoordinatesX;
    StartCoordinatesY = startCoordinatesY;
    EndCoordinatesX = endCoordinatesX;
    EndCoordinatesY = endCoordinatesY;
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
    return new Coordinates(StartCoordinatesX, StartCoordinatesY);
  }

  public Coordinates GetEndCoordinates()
  {
    return new Coordinates(EndCoordinatesX, EndCoordinatesY);
  }
}
