using System.Collections.Generic;
using System.Threading.Tasks;
using DDDSample1.Domain.Requests;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.DeviceTasks.SurveillanceTasks;
public interface ISurveillanceRequestRepository : IRepository<SurveillanceRequest, RequestId>
{
    Task<List<SurveillanceRequest>> GetRequestsByState(RequestState state, int page, int limit);
}
