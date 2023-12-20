using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using DDDSample1.Domain.DeviceTasks;
using DDDSample1.Domain.DeviceTasks.SurveillanceTask;
using DDDSample1.Domain.DeviceTasks.PickAndDeliveryTask;
using DDDSample1.Domain.User;

namespace DDDSample1.Infrastructure.Tasks;

internal class SurveillanceTaskEntityTypeConfiguration : IEntityTypeConfiguration<SurveillanceTask>
{
  public void Configure(EntityTypeBuilder<SurveillanceTask> builder)
  {
    // builder.ToTable("Tasks", SchemaNames.DDDSample1);
    builder.HasKey(b => b.Id);
    builder.Property(b => b.UserContact).HasConversion(b => b.Email, b => new UserEmail(b));
    // builder.Property<bool>("_active").HasColumnName("Active");
  }
}
