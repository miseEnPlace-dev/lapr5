using MDTasks.Infrastructure.Shared;
using MDTasks.Domain.Requests;
using MDTasks.Repositories;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace MDTasks.Infrastructure.Request;

public class PickAndDeliveryRequestRepository : BaseRepository<PickAndDeliveryRequest, RequestId>, IPickAndDeliveryRequestRepository
{
  readonly MySQLDbContext _context;

  public PickAndDeliveryRequestRepository(MySQLDbContext context) : base(context.PickAndDeliveryRequests)
  {
    _context = context;
  }

  public async Task<List<PickAndDeliveryRequest>> GetRequestsByState(RequestState state, int page, int limit)
  {
    if (page >= 0 || limit >= 0)
      return await _context.PickAndDeliveryRequests.Where(r => r.State.Equals(state)).Skip(page * limit).Take(limit).ToListAsync();
    return await _context.PickAndDeliveryRequests.Where(r => r.State.Equals(state)).ToListAsync();
  }
}
