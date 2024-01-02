namespace MDTasks.DTO;

public class SequenceResponseDTO
{
  public string[] tasks { get; set; }
  public double time { get; set; }

  public SequenceResponseDTO(string[] tasks, double time)
  {
    this.tasks = tasks;
    this.time = time;
  }
}
