using System.Collections.Generic;
using System.Threading.Tasks;
using MDTasks.Domain.Task;

namespace MDTasks.Infrastructure;

public interface ITaskRepository : IRepository<DeviceTask, TaskId>
{
  Task<List<DeviceTask>> GetAllOrderedByCreatedAt(int page, int limit);
  Task<List<DeviceTask>> GetAllWithDeviceIdAsync(string deviceId);
}
