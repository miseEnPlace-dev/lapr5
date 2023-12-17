using DDDSample1.Domain.Requests;
using DDDSample1.Infrastructure.Shared;

namespace DDDSample1.Infrastructure.Requests;

public class RequestRepository : BaseRepository<Request, RequestId>, IRequestRepository
{
  public RequestRepository(DDDSample1DbContext context) : base(context.Requests) { }
}