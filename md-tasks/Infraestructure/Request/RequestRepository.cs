


using DDDSample1.Domain.Requests;
using DDDSample1.Infrastructure;
using DDDSample1.Infrastructure.Requests;
using DDDSample1.Infrastructure.Shared;

public class RequestRepository : BaseRepository<Request, RequestId>, IRequestRepository
{
  public RequestRepository(DDDSample1DbContext context) : base(context.Requests)
  {
  }
}