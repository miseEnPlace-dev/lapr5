using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using DDDSample1.Domain.DeviceTasks;
using DDDSample1.Domain.DeviceTasks.SurveillanceTask;
using DDDSample1.Domain.DeviceTasks.PickAndDeliveryTask;

namespace DDDSample1.Infrastructure.Tasks;

internal class DeviceTaskEntityTypeConfiguration : IEntityTypeConfiguration<DeviceTask>
{
  public void Configure(EntityTypeBuilder<DeviceTask> builder)
  {
    // builder.ToTable("Tasks", SchemaNames.DDDSample1);
    builder.HasKey(b => b.Id);
    // builder.Property<bool>("_active").HasColumnName("Active");
  }
}
