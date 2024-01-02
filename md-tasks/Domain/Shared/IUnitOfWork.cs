using System.Threading.Tasks;

namespace MDTasks.Domain.Shared;

public interface IUnitOfWork
{
  Task<int> CommitAsync();
}
