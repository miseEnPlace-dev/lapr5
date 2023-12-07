using System;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Tasks;

namespace DDDSample1.Domain.Categories
{
    public abstract class Task : Entity<TaskId>, IAggregateRoot
    {
    }
}