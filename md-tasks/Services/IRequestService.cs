using System.Threading.Tasks;
using DDDNetCore.Domain.Request;
using DDDSample1.Domain.DeviceTasks;
using DDDSample1.Domain.DTO;
using DDDSample1.Domain.Requests;

namespace DDDNetCore.Services
{
  public interface IRequestService
  {
    Task<PaginationDTO<RequestDTO>> GetAllAsync(int page, int limit);
    Task<PaginationDTO<RequestDTO>> GetAllSurveillanceAsync(int page, int limit);
    Task<PaginationDTO<RequestDTO>> GetAllPickDeliveryAsync(int page, int limit);
    Task<RequestDTO> GetByIdAsync(RequestId id);
    Task<RequestDTO> AddSurveillanceTask(SurveillanceRequestDTO dto);
    Task<RequestDTO> AddPickAndDeliveryTask(PickAndDeliveryRequestDTO dto);
    Task<PaginationDTO<RequestDTO>> GetRequestsByState(RequestState state, int page, int limit);
    Task<PaginationDTO<RequestDTO>> GetRequestsByUserId(string userId, int page, int limit);
    Task<RequestDTO> UpdateAsync(RequestDTO dto);
    Task<RequestDTO> InactivateAsync(RequestId id);
    Task<RequestDTO> AcceptRequest(RequestId id);
    Task<RequestDTO> RejectRequest(RequestId id);
    Task<RequestDTO> DeleteAsync(RequestId id);
  }
}
