using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.DeviceTasks
{
  public abstract class DeviceTask : Entity<DeviceTaskId>, IAggregateRoot
  {
    public int StartCoordinateX { get; private set; }
    public int StartCoordinateY { get; private set; }
    public int EndCoordinateX { get; private set; }
    public int EndCoordinateY { get; private set; }

    public DeviceTask(DeviceTaskId id, int StartCoordinateX, int StartCoordinateY, int EndCoordinateX, int EndCoordinateY)
    {
      this.StartCoordinateX = StartCoordinateX;
      this.StartCoordinateY = StartCoordinateY;
      this.EndCoordinateX = EndCoordinateX;
      this.EndCoordinateY = EndCoordinateY;
      Id = id;
    }

    public abstract void ExecuteTask();
  }
}
