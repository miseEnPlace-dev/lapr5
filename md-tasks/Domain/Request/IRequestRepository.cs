using System.Collections.Generic;
using System.Threading.Tasks;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Requests
{
  public interface IRequestRepository : IRepository<Request, RequestId>
  {
    public Task<List<Request>> GetRequestsByState(RequestState state, int page, int limit);

    public Task<List<Request>> GetRequestsByUserId(string userId, int page, int limit);
  }
}
