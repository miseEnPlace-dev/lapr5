using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using DDDSample1.Domain.DeviceTasks;
using DDDSample1.Domain.Requests;

namespace DDDSample1.Infrastructure.Tasks;

internal class DeviceTaskEntityTypeConfiguration : IEntityTypeConfiguration<DeviceTask>
{
  public void Configure(EntityTypeBuilder<DeviceTask> builder)
  {
    // builder.ToTable("Tasks", SchemaNames.DDDSample1);
    builder.HasKey(b => new { b.Id, b.StartCoordinateX, b.StartCoordinateY, b.EndCoordinateX, b.EndCoordinateY, b.RequestedAt });
    builder.OwnsOne(b => b.UserId);
    builder.Property(b => b.State).HasConversion(s => s.State, s => new RequestState(s)).HasColumnName("State");


    // builder.Property<bool>("_active").HasColumnName("Active");
  }
}
