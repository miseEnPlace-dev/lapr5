using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using DDDSample1.Domain.Requests;
using DDDSample1.Infrastructure.Shared;
using Microsoft.EntityFrameworkCore;

namespace DDDSample1.Infrastructure.Requests;

public class RequestRepository : BaseRepository<Request, RequestId>, IRequestRepository
{
  readonly MySQLDbContext _context;
  public RequestRepository(MySQLDbContext context) : base(context.Requests)
  {
    _context = context;
  }

  public async Task<List<Request>> GetRequestsByState(string state)
  {
    var requests = await _context.Requests.ToListAsync();

    return requests.Where(r => r.State.AsString() == state).ToList();
  }

  public async Task<List<Request>> GetRequestsByType(string type)
  {
    return await _context.Requests.Where(r => r.DeviceTaskId.GetType().IsInstanceOfType(type)).ToListAsync();
  }

  public async Task<List<Request>> GetSurveillanceRequests()
  {
    return await GetRequestsByType("Surveillance");
  }
}
