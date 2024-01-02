using MDTasks.Domain.Task;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MDTasks.Infrastructure.Tasks;

internal class TaskEntityTypeConfiguration : IEntityTypeConfiguration<DeviceTask>
{
  public void Configure(EntityTypeBuilder<DeviceTask> builder)
  {
    // builder.ToTable("Requests", SchemaNames.MDTasks);
    builder.HasKey(b => new { b.Id, b.RequestId, b.CreatedAt });
    builder.Property(b => b.DeviceId).HasColumnType("longtext");
    builder.Property(b => b.IsFinished).HasColumnType("bit");
    // builder.OwnsOne(b => b.UserId);
    // builder.Property<bool>("_active").HasColumnName("Active");
  }
}
