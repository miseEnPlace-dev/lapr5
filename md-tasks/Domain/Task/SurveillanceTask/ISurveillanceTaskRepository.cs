using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.DeviceTasks.SurveillanceTask;
public interface ISurveillanceTaskRepository : IRepository<SurveillanceTask, DeviceTaskId>
{

}
