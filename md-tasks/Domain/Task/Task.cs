using System;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Task
{
    public abstract class Task : Entity<TaskId>, IAggregateRoot
    {
    }
}