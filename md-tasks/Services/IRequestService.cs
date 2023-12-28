using System.Collections.Generic;
using System.Threading.Tasks;
using DDDSample1.Domain.DTO;
using DDDSample1.Domain.Requests;
using Microsoft.AspNetCore.Mvc;

public interface IRequestService
{
  Task<PaginationDTO<RequestDTO>> GetAll(int page, int limit);
  Task<PaginationDTO<RequestDTO>> GetRequestsByState(string state, int page, int limit);
  Task<PaginationDTO<RequestDTO>> GetRequestsByUserId(string userId, int page, int limit);
  Task<PaginationDTO<SurveillanceRequestDTO>> GetAllSurveillance(int page, int limit);
  Task<PaginationDTO<PickDeliveryRequestDTO>> GetAllPickAndDelivery(int page, int limit);
  Task<RequestDTO> GetById(RequestId id);
  Task<RequestDTO> AddSurveillanceRequest(SurveillanceRequestDTO dto);
  Task<RequestDTO> AddPickAndDeliveryRequest(PickDeliveryRequestDTO dto);
  Task<RequestDTO> Update(RequestDTO dto);
  Task<RequestDTO> Put(RequestDTO dto);
  Task<RequestDTO> Delete(RequestId id);
}
