using System;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Task;

public class SurveillanceTask
{
  public string Description { get; private set; }

  public bool Active { get; private set; }

  public SurveillanceTask()
  {
    this.Active = true;
  }

  public SurveillanceTask(string description)
  {
    this.Description = description;
    this.Active = true;
  }

  public void ChangeDescription(string description)
  {
    if (!this.Active)
    {
      throw new BusinessRuleValidationException("Task is not active.");
    }
    this.Description = description;
  }

  public void Deactivate()
  {
    this.Active = false;
  }
}
