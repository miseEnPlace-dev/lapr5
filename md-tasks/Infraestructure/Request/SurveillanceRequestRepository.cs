using MDTasks.Infrastructure.Shared;
using MDTasks.Domain.Requests;
using MDTasks.Repositories;

namespace MDTasks.Infrastructure.Request;

public class SurveillanceRequestRepository : BaseRepository<SurveillanceRequest, RequestId>, ISurveillanceRequestRepository
{
  readonly MySQLDbContext _context;

  public SurveillanceRequestRepository(MySQLDbContext context) : base(context.SurveillanceRequests)
  {
    _context = context;
  }
}
