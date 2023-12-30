using DDDSample1.Infrastructure.Shared;
using DDDSample1.Domain.DeviceTasks;
using DDDSample1.Domain.DeviceTasks.PickAndDeliveryTasks;

namespace DDDSample1.Infrastructure.DeviceTasks;

public class PickAndDeliveryRequestRepository : BaseRepository<PickAndDeliveryRequest, RequestId>, IPickAndDeliveryRequestRepository
{
  readonly MySQLDbContext _context;
  public PickAndDeliveryRequestRepository(MySQLDbContext context) : base(context.PickAndDeliveryRequests)
  {
    _context = context;
  }
}
