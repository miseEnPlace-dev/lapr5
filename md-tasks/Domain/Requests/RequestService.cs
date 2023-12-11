using System.Collections.Generic;
using System.Threading.Tasks;
using DDDSample1.Domain.Shared;
using DDDSample1.Infrastructure.Requests;

namespace DDDSample1.Domain.Requests
{
  public class RequestService
  {
    private readonly IUnitOfWork _unitOfWork;
    private readonly IRequestRepository _repo;

    public RequestService(IUnitOfWork unitOfWork, IRequestRepository repo)
    {
      _unitOfWork = unitOfWork;
      _repo = repo;
    }

    public async Task<List<RequestDto>> GetAllAsync()
    {
      var list = await _repo.GetAllAsync();
      List<RequestDto> listDto = list.ConvertAll(r => new RequestDto(r.Id.AsGuid(), r.State.AsString()));
      return listDto;
    }

    public async Task<RequestDto> GetByIdAsync(RequestId id)
    {
      var r = await _repo.GetByIdAsync(id);
      if (r == null) return null;
      return new RequestDto(r.Id.AsGuid(), r.State.AsString());
    }

    public async Task<RequestDto> AddAsync(CreatingRequestDto dto)
    {
      var r = new Request(new RequestState(dto.State));
      await _repo.AddAsync(r);
      await _unitOfWork.CommitAsync();
      return new RequestDto(r.Id.AsGuid(), r.State.AsString());
    }

    public async Task<RequestDto> UpdateAsync(RequestDto dto)
    {
      var task = await _repo.GetByIdAsync(new RequestId(dto.Id));
      if (task == null) return null;

      // update fields
      if (dto.State is not null)
        task.ChangeState(new RequestState(dto.State));

      await _unitOfWork.CommitAsync();
      return new RequestDto(task.Id.AsGuid(), task.State.AsString());
    }

    public async Task<RequestDto> PutAsync(RequestDto dto)
    {
      var task = await _repo.GetByIdAsync(new RequestId(dto.Id));
      if (task == null) return null;

      // update fields
      task.ChangeState(new RequestState(dto.State));

      await _unitOfWork.CommitAsync();
      return new RequestDto(task.Id.AsGuid(), task.State.AsString());
    }

    public async Task<RequestDto> InactivateAsync(RequestId id)
    {
      var task = await _repo.GetByIdAsync(id);
      if (task == null) return null;

      if (task.Active) task.ToggleActive();

      await _unitOfWork.CommitAsync();
      return new RequestDto(task.Id.AsGuid(), task.State.AsString());
    }

    public async Task<RequestDto> DeleteAsync(RequestId id)
    {
      var task = await _repo.GetByIdAsync(id);
      if (task == null) return null;

      if (task.Active) throw new BusinessRuleValidationException("It is not possible to delete an active task.");

      _repo.Remove(task);
      await _unitOfWork.CommitAsync();

      return new RequestDto(task.Id.AsGuid(), task.State.AsString());
    }
  }
}