using MDTasks.Infrastructure.Shared;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using MDTasks.Domain.User;
using MDTasks.Domain.Request;

namespace MDTasks.Infrastructure.Requests;

public class PickAndDeliveryRequestRepository : BaseRepository<PickAndDeliveryRequest, RequestId>, IPickAndDeliveryRequestRepository
{
  readonly MySQLDbContext _context;
  public PickAndDeliveryRequestRepository(MySQLDbContext context) : base(context.PickAndDeliveryRequests)
  {
    _context = context;
  }

  public async Task<List<PickAndDeliveryRequest>> GetAllOrderedByRequestedAt(int page, int limit)
  {
    if (page >= 0 && limit >= 0)
      return await _context.PickAndDeliveryRequests.OrderBy(r => r.RequestedAt).Skip(page * limit).Take(limit).ToListAsync();
    return await _context.PickAndDeliveryRequests.OrderBy(r => r.RequestedAt).ToListAsync();
  }

  public async Task<List<PickAndDeliveryRequest>> GetRequestsByState(RequestState state, int page, int limit)
  {
    if (page >= 0 || limit >= 0)
      return await _context.PickAndDeliveryRequests.OrderBy(r => r.RequestedAt).Where(r => r.State.Equals(state)).Skip(page * limit).Take(limit).ToListAsync();
    return await _context.PickAndDeliveryRequests.OrderBy(r => r.RequestedAt).Where(r => r.State.Equals(state)).ToListAsync();
  }

  public async Task<List<PickAndDeliveryRequest>> GetRequestsByUserIdAsync(UserId id, int page, int limit)
  {
    if (page >= 0 || limit >= 0)
      return await _context.PickAndDeliveryRequests.OrderBy(r => r.RequestedAt).Where(r => r.UserId.Equals(id)).Skip(page * limit).Take(limit).ToListAsync();
    return await _context.PickAndDeliveryRequests.OrderBy(r => r.RequestedAt).Where(r => r.UserId.Equals(id)).ToListAsync();
  }
}
