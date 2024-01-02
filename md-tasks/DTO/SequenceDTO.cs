using System.Collections.Generic;

namespace MDTasks.DTO;

public record SequenceDTO(List<TaskDTO> Tasks, double Time, List<PathDTO> Path);
