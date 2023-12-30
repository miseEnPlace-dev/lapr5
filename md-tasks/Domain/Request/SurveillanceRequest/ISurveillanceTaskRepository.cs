using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.DeviceTasks.SurveillanceTasks;
public interface ISurveillanceRequestRepository : IRepository<SurveillanceRequest, RequestId>
{

}
