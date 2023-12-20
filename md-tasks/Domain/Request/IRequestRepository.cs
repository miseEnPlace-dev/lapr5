
using System.Collections.Generic;
using System.Threading.Tasks;
using DDDSample1.Domain.Requests;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Infrastructure.Requests
{
  public interface IRequestRepository : IRepository<Request, RequestId>
  {
    public Task<List<Request>> GetRequestsByState(string state);

    public Task<List<Request>> GetRequestsByType(string type);

    public Task<List<Request>> GetSurveillanceRequests();
  }
}
