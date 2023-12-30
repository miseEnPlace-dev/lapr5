using System.Collections.Generic;
using System.Threading.Tasks;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Requests
{
  public interface ITaskRepository : IRepository<DeviceTask, TaskId>
  {
  }
}
