using System.Threading.Tasks;
using DDDNetCore.Domain.Request;
using DDDSample1.Domain.DTO;
using DDDSample1.Domain.Requests;

namespace DDDNetCore.Services
{
  public interface ITaskService
  {

    Task<TaskDTO> Create(TaskDTO dto);
    Task<PaginationDTO<TaskDTO>> GetAll(int page, int limit);
    Task<PaginationDTO<SurveillanceTaskDTO>> GetAllSurveillance(int page, int limit);
    Task<PaginationDTO<PickDeliveryTaskDTO>> GetAllPickAndDelivery(int page, int limit);
    Task<TaskDTO> GetById(TaskId id);
    Task<SequenceDTO> GetApprovedTasksSequence();
    Task<TaskDTO> AddSurveillanceRequest(TaskDTO dto);
    Task<TaskDTO> AddPickAndDeliveryRequest(TaskDTO dto);
    Task<TaskDTO> Update(TaskDTO dto);
    Task<TaskDTO> Put(TaskDTO dto);
    Task<TaskDTO> Delete(TaskId id);
    Task<TaskDTO> AcceptRequest(TaskId id);
    Task<TaskDTO> RejectRequest(TaskId id);
    Task<TaskDTO> FinishTask(TaskId id);
  }
}
