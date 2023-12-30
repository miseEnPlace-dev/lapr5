using System.Collections.Generic;
using DDDSample1.Domain.DeviceTasks;

namespace DDDNetCore.Domain.Request
{
  public record SequenceDTO(List<DDDSample1.Domain.DeviceTasks.Request> Tasks, double Time, List<PathDTO> Path);
}
