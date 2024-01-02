using MDTasks.Infrastructure.Shared;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using MDTasks.Domain.User;
using MDTasks.Domain.Request;

namespace MDTasks.Infrastructure.Requests;

public class SurveillanceRequestRepository : BaseRepository<SurveillanceRequest, RequestId>, ISurveillanceRequestRepository
{
  readonly MySQLDbContext _context;
  public SurveillanceRequestRepository(MySQLDbContext context) : base(context.SurveillanceRequests)
  {
    _context = context;
  }

  public async Task<List<SurveillanceRequest>> GetAllOrderedByRequestedAt(int page, int limit)
  {
    if (page >= 0 && limit >= 0)
      return await _context.SurveillanceRequests.OrderBy(r => r.RequestedAt).Skip(page * limit).Take(limit).ToListAsync();
    return await _context.SurveillanceRequests.OrderBy(r => r.RequestedAt).ToListAsync();
  }

  public async Task<List<SurveillanceRequest>> GetRequestsByState(RequestState state, int page, int limit)
  {
    if (page >= 0 && limit >= 0)
      return await _context.SurveillanceRequests.OrderBy(r => r.RequestedAt).Where(r => r.State.Equals(state)).Skip(page * limit).Take(limit).ToListAsync();
    return await _context.SurveillanceRequests.OrderBy(r => r.RequestedAt).Where(r => r.State.Equals(state)).ToListAsync();
  }

  public async Task<List<SurveillanceRequest>> GetRequestsByUserIdAsync(UserId id, int page, int limit)
  {
    if (page >= 0 && limit >= 0)
      return await _context.SurveillanceRequests.OrderBy(r => r.RequestedAt).Where(r => r.UserId.Equals(id)).Skip(page * limit).Take(limit).ToListAsync();
    return await _context.SurveillanceRequests.OrderBy(r => r.RequestedAt).Where(r => r.UserId.Equals(id)).ToListAsync();
  }
}
