using System.Collections.Generic;
using System.Threading.Tasks;

namespace MDTasks.Domain.Shared;

public interface IRepository<TEntity, TEntityId>
{
  Task<List<TEntity>> GetAllAsync(int page, int limit);
  Task<TEntity> GetByIdAsync(TEntityId id);
  Task<List<TEntity>> GetByIdsAsync(List<TEntityId> ids);
  Task<TEntity> AddAsync(TEntity obj);
  Task<int> CountAsync();
  void Remove(TEntity obj);
}
