using System.Collections.Generic;
using System.Threading.Tasks;
using DDDSample1.Domain.DeviceModel;
using DDDSample1.Domain.DeviceTasks;
using DDDSample1.Domain.DTO;
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

    public async Task<List<RequestDTO>> GetAllAsync()
    {
      var list = await _repo.GetAllAsync();

      List<RequestDTO> listDto = new();
      //list = list.ConvertAll(r => new RequestDTO(r));
      return listDto;
    }

    public async Task<List<RequestDTO>> GetAllSurveillanceAsync()
    {
      var list = await _repo.GetSurveillanceRequests();

      List<RequestDTO> listDto = new();
      //list = list.ConvertAll(r => new SurveillanceRequestDTO(r));
      return listDto;
    }

    public async Task<List<RequestDTO>> GetRequestsByState(string state)
    {
      var list = await _repo.GetRequestsByState(state);

      List<RequestDTO> listDto = new();
      return listDto;
    }

    public async Task<RequestDTO> GetByIdAsync(RequestId id)
    {
      var r = await _repo.GetByIdAsync(id);
      if (r == null) return null;
      return null;
    }

    public async Task<RequestDTO> AddAsync(RequestDTO dto)
    {
      //var r = new Request(new UserEmail(dto.UserEmail), new DeviceTaskId(dto.DeviceTaskId));
      await _repo.AddAsync(null);
      await _unitOfWork.CommitAsync();
      return null;
    }

    public async Task<RequestDTO> UpdateAsync(RequestDTO dto)
    {
      var r = await _repo.GetByIdAsync(new RequestId(dto.Id));
      if (r == null) return null;

      // update fields
      if (dto.State is not null)
        r.ChangeState(new RequestState(dto.State));

      await _unitOfWork.CommitAsync();
      return null;
    }

    public async Task<RequestDTO> PutAsync(RequestDTO dto)
    {
      var r = await _repo.GetByIdAsync(new RequestId(dto.Id));
      if (r == null) return null;

      // update fields
      r.ChangeState(new RequestState(dto.State));

      await _unitOfWork.CommitAsync();
      return null;
    }

    public async Task<RequestDTO> DeleteAsync(RequestId id)
    {
      var r = await _repo.GetByIdAsync(id);
      if (r == null) return null;

      _repo.Remove(r);
      await _unitOfWork.CommitAsync();

      return null;
    }
  }
}
