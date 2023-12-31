using System.Collections.Generic;
using DDDSample1.Domain.DTO;

namespace DDDNetCore.Domain.Request
{
  public record SequenceDTO(List<RequestDTO> Tasks, double Time, List<PathDTO> Path);
}
