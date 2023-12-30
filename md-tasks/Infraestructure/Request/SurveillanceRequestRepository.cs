using MDTasks.Infrastructure.Shared;
using MDTasks.Domain.Requests;
using MDTasks.Repositories;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MDTasks.Infrastructure.Request;

public class SurveillanceRequestRepository : BaseRepository<SurveillanceRequest, RequestId>, ISurveillanceRequestRepository
{
  readonly MySQLDbContext _context;

  public SurveillanceRequestRepository(MySQLDbContext context) : base(context.SurveillanceRequests)
  {
    _context = context;
  }

  public async Task<List<SurveillanceRequest>> GetRequestsByState(RequestState state, int page, int limit)
  {
    if (page >= 0 && limit >= 0)
      return await _context.SurveillanceRequests.Where(r => r.State.Equals(state)).Skip(page * limit).Take(limit).ToListAsync();
    return await _context.SurveillanceRequests.Where(r => r.State.Equals(state)).ToListAsync();
  }
}
