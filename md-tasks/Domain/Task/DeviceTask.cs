using System;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.User;

namespace DDDSample1.Domain.DeviceTasks
{
  public abstract class DeviceTask : Entity<DeviceTaskId>, IAggregateRoot
  {
    public int StartCoordinateX { get; private set; }
    public int StartCoordinateY { get; private set; }
    public int EndCoordinateX { get; private set; }
    public int EndCoordinateY { get; private set; }

    public UserId UserId { get; private set; }

    public DeviceTask(DeviceTaskId Id, int StartCoordinateX, int StartCoordinateY, int EndCoordinateX, int EndCoordinateY, UserId UserId)
    {
      this.StartCoordinateX = StartCoordinateX;
      this.StartCoordinateY = StartCoordinateY;
      this.EndCoordinateX = EndCoordinateX;
      this.EndCoordinateY = EndCoordinateY;
      this.UserId = UserId;
      this.Id = Id;
    }

    public abstract void ExecuteTask();
  }
}
