namespace DDDSample1.Domain.Requests
{
  public class CreatingRequestDto
  {
    public string State { get; set; }

    public CreatingRequestDto(string State)
    {
      this.State = State;
    }
  }
}