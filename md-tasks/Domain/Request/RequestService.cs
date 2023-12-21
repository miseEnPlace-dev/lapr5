using System.Collections.Generic;
using System.Threading.Tasks;
using DDDSample1.Domain.DTO;
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

    public async Task<List<IRequestDTO>> GetAllAsync()
    {
      var list = await _repo.GetAllAsync();

      List<IRequestDTO> listDto = new();
      //list = list.ConvertAll(r => new IRequestDTO(r));
      return listDto;
    }

    public async Task<List<IRequestDTO>> GetAllSurveillanceAsync()
    {
      var list = await _repo.GetSurveillanceRequests();

      List<IRequestDTO> listDto = new();
      //list = list.ConvertAll(r => new SurveillanceRequestDTO(r));
      return listDto;
    }

    public async Task<List<IRequestDTO>> GetRequestsByState(string state)
    {
      var list = await _repo.GetRequestsByState(state);

      List<IRequestDTO> listDto = new();
      return listDto;
    }

    public async Task<IRequestDTO> GetByIdAsync(RequestId id)
    {
      var r = await _repo.GetByIdAsync(id);
      if (r == null) return null;
      return null;
    }

    public async Task<IRequestDTO> AddAsync(IRequestDTO dto)
    {
      //var r = new Request(new UserEmail(dto.UserEmail), new DeviceTaskId(dto.DeviceTaskId));
      await _repo.AddAsync(null);
      await _unitOfWork.CommitAsync();
      return null;
    }

    public async Task<IRequestDTO> UpdateAsync(IRequestDTO dto)
    {
      var r = await _repo.GetByIdAsync(new RequestId(dto.Id));
      if (r == null) return null;

      // update fields
      r.ChangeState(new RequestState(dto.State));

      await _unitOfWork.CommitAsync();
      return null;
    }

    public async Task<IRequestDTO> PutAsync(IRequestDTO dto)
    {
      var r = await _repo.GetByIdAsync(new RequestId(dto.Id));
      if (r == null) return null;

      // update fields
      r.ChangeState(new RequestState(dto.State));

      await _unitOfWork.CommitAsync();
      return null;
    }

    public async Task<IRequestDTO> DeleteAsync(RequestId id)
    {
      var r = await _repo.GetByIdAsync(id);
      if (r == null) return null;

      _repo.Remove(r);
      await _unitOfWork.CommitAsync();

      return null;
    }
  }
}
