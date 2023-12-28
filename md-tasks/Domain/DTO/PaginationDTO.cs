using Newtonsoft.Json;

public class PaginationDTO<T>
{
  public class Meta
  {
    public int Page { get; set; }
    public int Limit { get; set; }
    public int Total { get; set; }
    public int TotalPages { get; set; }
  }

  public Meta meta { get; set; }
  public T[] data { get; set; }

  [JsonConstructor]
  public PaginationDTO(T[] data, int page, int limit, int total)
  {
    this.data = data;
    this.meta = new Meta
    {
      Page = page,
      Limit = limit,
      Total = total,
      TotalPages = (int)System.Math.Ceiling((double)total / limit)
    };
  }
}