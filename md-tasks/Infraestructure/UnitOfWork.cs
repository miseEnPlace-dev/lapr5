using System.Threading.Tasks;
using MDTasks.Domain.Shared;

namespace MDTasks.Infrastructure;

public class UnitOfWork : IUnitOfWork
{
  private readonly MySQLDbContext _context;

  public UnitOfWork(MySQLDbContext context)
  {
    _context = context;
  }

  public async Task<int> CommitAsync()
  {
    return await _context.SaveChangesAsync();
  }
}
