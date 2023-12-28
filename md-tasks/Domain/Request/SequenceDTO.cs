using System.Collections.Generic;
using DDDSample1.Domain.DeviceTasks.PickAndDeliveryTask;

namespace DDDNetCore.Domain.Request
{
  public record SequenceDTO(List<PickAndDeliveryTask> Tasks, double Time, PathDTO Path);
}
