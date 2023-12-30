using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.DeviceTasks.SurveillanceTasks;
public interface ISurveillanceTaskRepository : IRepository<SurveillanceTask, DeviceTaskId>
{

}
