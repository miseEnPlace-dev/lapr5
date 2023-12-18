using System;
using DDDSample1.Domain.DeviceModel;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.User;
using DDDSample1.Domain.DeviceTasks;

namespace DDDSample1.Domain.Requests
{
    public class Request : Entity<RequestId>, IAggregateRoot
    {
        public RequestState State { get; private set; }

        public DeviceModelCode DeviceModelCode { get; private set; }

        public UserEmail UserEmail { get; private set; }

        public bool Active { get; private set; }

        private Request()
        {
            Active = true;
        }

        public Request(RequestState state, DeviceModelCode DeviceModelCode, UserEmail userEmail)
        {
            State = state;
            this.DeviceModelCode = DeviceModelCode;
            UserEmail = userEmail;
            Active = true;
            Id = new RequestId(Guid.NewGuid());
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