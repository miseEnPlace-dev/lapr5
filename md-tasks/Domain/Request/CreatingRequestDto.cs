using DDDSample1.Domain.Categories;

namespace DDDSample1.Domain.Requests
{
  public class CreatingRequestDto
  {
    public RequestState State { get; set; }

    public CreatingRequestDto(RequestState state)
    {
      State = state;
    }
  }
}