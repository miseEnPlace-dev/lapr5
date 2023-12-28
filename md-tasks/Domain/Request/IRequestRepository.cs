using System.Collections.Generic;
using System.Threading.Tasks;
using DDDSample1.Domain.Requests;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Infrastructure.Requests
{
  public interface IRequestRepository : IRepository<Request, RequestId>
  {
    public Task<List<Request>> GetRequestsByState(RequestState state, int page, int limit);
    public Task<List<Request>> GetRequestsByType(string type, int page, int limit);
    public Task<List<Request>> GetRequestsByTypeAndByState(RequestState state, string type, int page, int limit);
    public Task<List<Request>> GetRequestsByUserId(string deviceId, int page, int limit);
  }
}
