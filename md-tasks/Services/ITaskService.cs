using System.Threading.Tasks;
using MDTasks.Domain.DTO;
using MDTasks.Domain.Tasks;

namespace MDTasks.Services;

public interface ITaskService
{
<<<<<<< HEAD
  Task<PaginationDTO<TaskDTO>> GetAll(int page, int limit);
  Task<PaginationDTO<PickAndDeliveryRequestDTO>> GetAllPickAndDelivery(int page, int limit);
  Task<PaginationDTO<SurveillanceRequestDTO>> GetAllSurveillance(int page, int limit);
  Task<TaskDTO> GetById(TaskId id);
  Task<RequestDTO> AddSurveillanceTask(TaskDTO dto);
  Task<RequestDTO> AddPickAndDeliveryTask(TaskDTO dto);
  Task<TaskDTO> Update(TaskDTO dto);
  Task<TaskDTO> Put(TaskDTO dto);
  Task<TaskDTO> Delete(TaskId id);
  Task<SequenceDTO> GetApprovedTasksSequence();
=======
  public interface ITaskService
  {
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
  }
>>>>>>> origin/main
}
