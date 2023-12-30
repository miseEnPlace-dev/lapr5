using System.Collections.Generic;
using System.Threading.Tasks;
using DDDSample1.Domain.Requests;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.User;

namespace DDDSample1.Domain.DeviceTasks.SurveillanceTasks;
public interface ISurveillanceRequestRepository : IRepository<SurveillanceRequest, RequestId>
{
    Task<List<SurveillanceRequest>> GetRequestsByState(RequestState state, int page, int limit);
    Task<List<SurveillanceRequest>> GetRequestsByUserId(UserId userId, int page, int limit);
}