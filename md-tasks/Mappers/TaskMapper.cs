using System;
using MDTasks.Domain.DTO;
using MDTasks.Domain.Requests;
using MDTasks.Domain.Tasks;

namespace MDTasks.Mappers;

public class TaskMapper
{
  public static TaskDTO ToDTO(DeviceTask task)
  {
    return new TaskDTO(task.Id.Value, task.CreatedAt.ToString(), task.DeviceId, task.RequestId.Value);
  }

  public static DeviceTask ToEntity(TaskDTO dto)
  {
    return new DeviceTask(new TaskId(Guid.Parse(dto.Id)), new RequestId(Guid.Parse(dto.RequestId)), DateTime.Parse(dto.CreatedAt), dto.DeviceId);
  }
}
