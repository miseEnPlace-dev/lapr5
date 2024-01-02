using System.Threading.Tasks;
using MDTasks.DTO;
using MDTasks.Domain.Request;
using MDTasks.Domain.User;

namespace MDTasks.Services;

public interface IRequestService
{
  Task<PaginationDTO<RequestDTO>> GetAllAsync(int page, int limit);
  Task<PaginationDTO<RequestDTO>> GetRequestsByUserIdAsync(UserId id, int page, int limit);
  Task<PaginationDTO<RequestDTO>> GetAllSurveillanceAsync(int page, int limit);
  Task<PaginationDTO<RequestDTO>> GetAllPickDeliveryAsync(int page, int limit);
  Task<RequestDTO> GetByIdAsync(RequestId id);
  Task<RequestDTO> AddSurveillanceTask(SurveillanceRequestDTO dto);
  Task<RequestDTO> AddPickAndDeliveryTask(PickAndDeliveryRequestDTO dto);
  Task<PaginationDTO<RequestDTO>> GetRequestsByState(RequestState state, int page, int limit);
  Task<RequestDTO> UpdateAsync(RequestDTO dto);
  Task<RequestDTO> AcceptRequest(RequestId id, TaskDTO taskDTO);
  Task<RequestDTO> RejectRequest(RequestId id);
  Task<RequestDTO> DeleteAsync(RequestId id);
}