using System.Threading.Tasks;
using DDDNetCore.Domain.Request;
using DDDSample1.Domain.DTO;
using DDDSample1.Domain.Requests;

namespace DDDNetCore.Services
{
  public interface IRequestService
  {
    Task<PaginationDTO<RequestDTO>> GetAll(int page, int limit);
    Task<PaginationDTO<SurveillanceRequestDTO>> GetAllSurveillance(int page, int limit);
    Task<PaginationDTO<PickDeliveryRequestDTO>> GetAllPickAndDelivery(int page, int limit);
    Task<RequestDTO> GetById(RequestId id);
    Task<SequenceDTO> GetApprovedTasksSequence();
    Task<RequestDTO> AddSurveillanceRequest(RequestDTO dto);
    Task<RequestDTO> AddPickAndDeliveryRequest(RequestDTO dto);
    Task<RequestDTO> Update(RequestDTO dto);
    Task<RequestDTO> Put(RequestDTO dto);
    Task<RequestDTO> Delete(RequestId id);
    Task<RequestDTO> AcceptRequest(RequestId id);
    Task<RequestDTO> RejectRequest(RequestId id);
  }
}
