
using DDDSample1.Domain.Requests;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Infrastructure.Requests
{
  public interface IRequestRepository : IRepository<Request, RequestId>
  {
  }

}
