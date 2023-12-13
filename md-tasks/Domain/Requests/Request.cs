using DDDSample1.Domain.DeviceModel;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.User;

namespace DDDSample1.Domain.Requests
{
    public class Request : Entity<RequestId>, IAggregateRoot
    {
        public RequestState State { get; private set; }

        public DeviceModelId DeviceModelId { get; private set; }

        public UserId UserId { get; private set; }

        public bool Active { get; private set; }

        private Request()
        {
            Active = true;
        }

        public Request(RequestState state, DeviceModelId deviceModelId, UserId userId)
        {
            State = state;
            DeviceModelId = deviceModelId;
            UserId = userId;
            Active = true;
        }

        public void ChangeState(RequestState state)
        {
            if (!Active)
            {
                throw new BusinessRuleValidationException("Request is not active.");
            }
            State = state;
        }

        public bool ToggleActive()
        {
            return Active = !Active;
        }
    }
}