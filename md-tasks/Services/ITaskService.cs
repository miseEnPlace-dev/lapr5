using System.Threading.Tasks;
using DDDNetCore.Domain.Request;
using DDDSample1.Domain.DTO;
using DDDSample1.Domain.Requests;

namespace DDDNetCore.Services
{
  public interface ITaskService
  {
    Task<PaginationDTO<TaskDTO>> GetAll(int page, int limit);
    Task<TaskDTO> AddSurveillanceTask(SurveillanceTaskDTO dto);
    Task<TaskDTO> AddPickAndDeliveryTask(PickDeliveryTaskDTO dto);
  }
}
