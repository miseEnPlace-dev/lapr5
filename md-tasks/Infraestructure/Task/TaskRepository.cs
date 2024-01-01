using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DDDSample1.Domain.DeviceModel;
using DDDSample1.Domain.Requests;
using DDDSample1.Infrastructure.Shared;
using Microsoft.EntityFrameworkCore;

namespace DDDSample1.Infrastructure.Requests;

public class RequestRepository : BaseRepository<DeviceTask, TaskId>, ITaskRepository
{
  readonly MySQLDbContext _context;
  public RequestRepository(MySQLDbContext context) : base(context.Tasks)
  {
    _context = context;
  }

  public async Task<List<DeviceTask>> GetAllWithDeviceIdAsync(string deviceId)
  {
    return await _context.Tasks.Where(t => t.DeviceId == deviceId).ToListAsync();
  }
}
