using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DDDSample1.Domain.Requests;
using DDDSample1.Infrastructure.Shared;
using Microsoft.EntityFrameworkCore;

namespace DDDSample1.Infrastructure.Requests;

public class RequestRepository : BaseRepository<Request, RequestId>, IRequestRepository
{
  MySQLDbContext _context;
  public RequestRepository(MySQLDbContext context) : base(context.Requests)
  {
    _context = context;
  }

  public async Task<List<Request>> GetTasksByState(string state)
  {
    return await _context.Requests.Where(r => r.State.AsString() == state).ToListAsync();
  }
}