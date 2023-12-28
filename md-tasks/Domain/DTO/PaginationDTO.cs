using System;
using System.Collections;
using System.Collections.Generic;
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
  public List<T> data { get; set; }

  [JsonConstructor]
  public PaginationDTO(List<T> data, int page, int limit, int total)
  {
    this.data = data;
    this.meta = new Meta
    {
      Page = Math.Abs(page),
      Limit = Math.Abs(limit),
      Total = total,
      TotalPages = Math.Abs((int)Math.Ceiling((double)total / limit))
    };
  }

  // public IEnumerator<T> GetEnumerator()
  // {
  //   return data.GetEnumerator();
  // }

  // IEnumerator IEnumerable.GetEnumerator()
  // {
  //   return ((IEnumerable)data).GetEnumerator();
  // }
}