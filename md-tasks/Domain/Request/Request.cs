using System;
using DDDSample1.Domain.Requests;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.User;

namespace DDDSample1.Domain.DeviceTasks
{
  public abstract class Request : Entity<RequestId>, IAggregateRoot
  {
    public int StartCoordinateX { get; private set; }
    public int StartCoordinateY { get; private set; }
    public int EndCoordinateX { get; private set; }
    public int EndCoordinateY { get; private set; }

    public DateTime RequestedAt { get; private set; }

    public RequestState State { get; private set; }

    public UserId UserId { get; private set; }

    public Request(RequestId Id, int StartCoordinateX, int StartCoordinateY, int EndCoordinateX, int EndCoordinateY, UserId UserId)
    {
      this.StartCoordinateX = StartCoordinateX;
      this.StartCoordinateY = StartCoordinateY;
      this.EndCoordinateX = EndCoordinateX;
      this.EndCoordinateY = EndCoordinateY;
      this.UserId = UserId;
      this.Id = Id;
      RequestedAt = DateTime.Now;
      State = new RequestState(StateEnum.Pending);
    }

    public abstract void ExecuteTask();
  }
}
