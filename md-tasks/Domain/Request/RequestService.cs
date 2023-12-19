using System.Collections.Generic;
using System.Threading.Tasks;
using DDDSample1.Domain.DeviceModel;
using DDDSample1.Domain.DeviceTasks;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.User;
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

      List<RequestDto> listDto = list.ConvertAll(r => new RequestDto(r));
      return listDto;
    }

    public async Task<List<RequestDto>> GetTasksByState(string state)
    {
      var list = await _repo.GetTasksByState(state);

      List<RequestDto> listDto = list.ConvertAll(r => new RequestDto(r));
      return listDto;
    }

    public async Task<RequestDto> GetByIdAsync(RequestId id)
    {
      var r = await _repo.GetByIdAsync(id);
      if (r == null) return null;
      return new RequestDto(r);
    }

    public async Task<RequestDto> AddAsync(RequestDto dto)
    {
      var r = new Request(new DeviceModelCode(dto.DeviceModelCode), new UserEmail(dto.UserEmail), new DeviceTaskId(dto.DeviceTaskId));
      await _repo.AddAsync(r);
      await _unitOfWork.CommitAsync();
      return new RequestDto(r);
    }

    public async Task<RequestDto> UpdateAsync(RequestDto dto)
    {
      var r = await _repo.GetByIdAsync(new RequestId(dto.Id));
      if (r == null) return null;

      // update fields
      if (dto.State is not null)
        r.ChangeState(new RequestState(dto.State));

      await _unitOfWork.CommitAsync();
      return new RequestDto(r);
    }

    public async Task<RequestDto> PutAsync(RequestDto dto)
    {
      var r = await _repo.GetByIdAsync(new RequestId(dto.Id));
      if (r == null) return null;

      // update fields
      r.ChangeState(new RequestState(dto.State));

      await _unitOfWork.CommitAsync();
      return new RequestDto(r);
    }

    public async Task<RequestDto> InactivateAsync(RequestId id)
    {
      var r = await _repo.GetByIdAsync(id);
      if (r == null) return null;

      if (r.Active) r.ToggleActive();

      await _unitOfWork.CommitAsync();
      return new RequestDto(r);
    }

    public async Task<RequestDto> DeleteAsync(RequestId id)
    {
      var r = await _repo.GetByIdAsync(id);
      if (r == null) return null;

      if (r.Active) throw new BusinessRuleValidationException("It is not possible to delete an active task.");

      _repo.Remove(r);
      await _unitOfWork.CommitAsync();

      return new RequestDto(r);
    }
  }
}