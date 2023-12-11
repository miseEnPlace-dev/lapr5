using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Requests
{
    public class Request : Entity<RequestId>, IAggregateRoot
    {
        public RequestState State { get; private set; }

        public bool Active { get; private set; }

        private Request()
        {
            this.Active = true;
        }

        public Request(RequestState state)
        {
            this.State = state;
            this.Active = true;
        }

        public void ChangeState(RequestState state)
        {
            if (!this.Active)
            {
                throw new BusinessRuleValidationException("Request is not active.");
            }
            this.State = state;
        }

        public bool ToggleActive()
        {
            return Active = !Active;
        }
    }
}