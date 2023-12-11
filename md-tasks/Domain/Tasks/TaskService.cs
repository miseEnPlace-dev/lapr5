using System.Collections.Generic;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Tasks
{
  public class TaskService
  {
    private readonly IUnitOfWork _unitOfWork;
    private readonly ITaskRepository _repo;

    public TaskService(IUnitOfWork unitOfWork, ITaskRepository repo)
    {
      this._unitOfWork = unitOfWork;
      this._repo = repo;
    }

    public async Task<List<TaskDto>> GetAllAsync()
    {
      var list = await this._repo.GetAllAsync();

      List<TaskDto> listDto = list.ConvertAll<TaskDto>(task => new TaskDto { Id = task.Id.AsString() });

      return listDto;
    }

    public async Task<TaskDto> GetByIdAsync(TaskId id)
    {
      var task = await this._repo.GetByIdAsync(id);

      if (task == null)
        return null;

      return new TaskDto { Id = task.Id.AsString() };
    }

    public async Task<TaskDto> AddAsync(TaskDto dto)
    {
      var task = new Task(dto.Id);

      await this._repo.AddAsync(task);

      await this._unitOfWork.CommitAsync();

      return new TaskDto { Id = task.Id.AsString() };
    }

    public async Task<TaskDto> UpdateAsync(TaskDto dto)
    {
      var task = await this._repo.GetByIdAsync(new TaskId(dto.Id));

      if (task == null)
        return null;

      // change all field
      // ...

      await this._unitOfWork.CommitAsync();

      return new TaskDto { Id = task.Id.AsString() };
    }

    public async Task<TaskDto> InactivateAsync(TaskId id)
    {
      var task = await this._repo.GetByIdAsync(id);

      if (task == null)
        return null;

      // change all fields
      // ...

      await this._unitOfWork.CommitAsync();

      return new TaskDto { Id = task.Id.AsString() };
    }

    public async Task<TaskDto> DeleteAsync(TaskId id)
    {
      var task = await this._repo.GetByIdAsync(id);

      if (task == null)
        return null;

      // if (task.Active)
      //   throw new BusinessRuleValidationException("It is not possible to delete an active task.");

      this._repo.Remove(task);
      await this._unitOfWork.CommitAsync();

      return new TaskDto { Id = task.Id.AsString() };
    }
  }
}