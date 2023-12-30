using MDTasks.Infrastructure.Shared;
using MDTasks.Domain.Requests;
using MDTasks.Repositories;

namespace MDTasks.Infrastructure.Request;

public class PickAndDeliveryRequestRepository : BaseRepository<PickAndDeliveryRequest, RequestId>, IPickAndDeliveryRequestRepository
{
  readonly MySQLDbContext _context;

  public PickAndDeliveryRequestRepository(MySQLDbContext context) : base(context.PickAndDeliveryRequests)
  {
    _context = context;
  }
}
