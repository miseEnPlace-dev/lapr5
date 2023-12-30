using DDDSample1.Infrastructure.Shared;
using DDDSample1.Domain.DeviceTasks;
using DDDSample1.Domain.DeviceTasks.SurveillanceTasks;
using System.Threading.Tasks;
using System.Collections.Generic;
using DDDSample1.Domain.Requests;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using DDDSample1.Domain.User;

namespace DDDSample1.Infrastructure.DeviceTasks;

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

  public async Task<List<SurveillanceRequest>> GetRequestsByUserId(UserId userId, int page, int limit)
  {
    if (page >= 0 && limit >= 0)
      return await _context.SurveillanceRequests.Where(r => r.UserId.Equals(userId)).Skip(page * limit).Take(limit).ToListAsync();
    return await _context.SurveillanceRequests.Where(r => r.UserId.Equals(userId)).ToListAsync();
  }
}
