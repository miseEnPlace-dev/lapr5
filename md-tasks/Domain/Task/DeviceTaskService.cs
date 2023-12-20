using System.Collections.Generic;
using System.Threading.Tasks;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.DeviceTasks
{
  public class DeviceTaskService
  {
    private readonly IUnitOfWork _unitOfWork;
    private readonly IDeviceTaskRepository _repo;

    public DeviceTaskService(IUnitOfWork unitOfWork, IDeviceTaskRepository repo)
    {
      _unitOfWork = unitOfWork;
      _repo = repo;
    }

    // public async Task<List<TaskDto>> GetAllAsync()
    // {
    //   var list = await _repo.GetAllAsync();
    //   List<TaskDto> listDto = list.ConvertAll(task => new TaskDto(Task) { Id = task.Id.AsString() });
    //   return listDto;
    // }

    public async Task<DeviceTaskDto> GetByIdAsync(DeviceTaskId id)
    {
      var task = await this._repo.GetByIdAsync(id);

      if (task == null)
        return null;

      return new DeviceTaskDto { Id = task.Id.AsString() };
    }

    // public async Task<TaskDto> AddAsync(TaskDto dto)
    // {
    //   var task = new Tasks.Task(dto.Id);

    //   await this._repo.AddAsync(task);

    //   await this._unitOfWork.CommitAsync();

    //   return new TaskDto { Id = task.Id.AsString() };
    // }

    public async Task<DeviceTaskDto> UpdateAsync(DeviceTaskDto dto)
    {
      var task = await this._repo.GetByIdAsync(new DeviceTaskId(dto.Id));

      if (task == null)
        return null;

      // change all field
      // ...

      await this._unitOfWork.CommitAsync();

      return new DeviceTaskDto { Id = task.Id.AsString() };
    }

    public async Task<DeviceTaskDto> InactivateAsync(DeviceTaskId id)
    {
      var task = await this._repo.GetByIdAsync(id);

      if (task == null)
        return null;

      // change all fields
      // ...

      await this._unitOfWork.CommitAsync();

      return new DeviceTaskDto { Id = task.Id.AsString() };
    }

    public async Task<DeviceTaskDto> DeleteAsync(DeviceTaskId id)
    {
      var task = await this._repo.GetByIdAsync(id);

      if (task == null)
        return null;

      // if (task.Active)
      //   throw new BusinessRuleValidationException("It is not possible to delete an active task.");

      this._repo.Remove(task);
      await this._unitOfWork.CommitAsync();

      return new DeviceTaskDto { Id = task.Id.AsString() };
    }
  }
}
