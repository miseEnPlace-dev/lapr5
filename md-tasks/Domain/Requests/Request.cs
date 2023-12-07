using System;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Task.PickAndDeliveryTask;

namespace DDDSample1.Domain.Requests
{
    public class Request : Entity<RequestId>, IAggregateRoot
    {
        public RequestState State { get; private set; }

        private Request()
        {
            State = new RequestState("Pending");
        }

        public Request(PickAndDeliveryTask task)
        {
            Id = new RequestId(Guid.NewGuid());
            State = new RequestState("Pending");
        }

        public void ChangeState(string state)
        {
            State.ChangeState(state);
        }
    }
}