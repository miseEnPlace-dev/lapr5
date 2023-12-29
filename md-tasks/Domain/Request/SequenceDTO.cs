using System.Collections.Generic;
using DDDSample1.Domain.DeviceTasks;

namespace DDDNetCore.Domain.Request
{
  public record SequenceDTO(List<DeviceTask> Tasks, double Time, PathDTO Path);
}
