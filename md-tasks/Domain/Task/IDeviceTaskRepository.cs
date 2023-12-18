using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.DeviceTasks
{
  public interface ITaskRepository : IRepository<DeviceTask, DeviceTaskId>
  {

  }
}