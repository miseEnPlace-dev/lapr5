using System.Collections.Generic;
using MDTasks.Domain.Path;
using MDTasks.Domain.Requests;

namespace MDTasks.Domain.DTO;

public record SequenceDTO(List<Request> Tasks, double Time, List<PathDTO> Path);
