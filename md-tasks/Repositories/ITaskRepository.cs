using MDTasks.Domain.Shared;
using MDTasks.Domain.Tasks;

namespace MDTasks.Repositories;

public interface ITaskRepository : IRepository<DeviceTask, TaskId> { }
