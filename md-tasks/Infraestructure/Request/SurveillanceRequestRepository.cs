using DDDSample1.Infrastructure.Shared;
using DDDSample1.Domain.DeviceTasks;
using DDDSample1.Domain.DeviceTasks.SurveillanceTasks;

namespace DDDSample1.Infrastructure.DeviceTasks;

public class SurveillanceRequestRepository : BaseRepository<SurveillanceRequest, RequestId>, ISurveillanceRequestRepository
{
  readonly MySQLDbContext _context;
  public SurveillanceRequestRepository(MySQLDbContext context) : base(context.SurveillanceRequests)
  {
    _context = context;
  }
}
