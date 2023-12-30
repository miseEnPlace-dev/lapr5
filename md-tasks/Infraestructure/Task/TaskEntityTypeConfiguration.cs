using MDTasks.Domain.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MDTasks.Infrastructure.Task;

internal class TaskEntityTypeConfiguration : IEntityTypeConfiguration<DeviceTask>
{
  public void Configure(EntityTypeBuilder<DeviceTask> builder)
  {
    // builder.ToTable("Tasks", SchemaNames.DDDSample1);
    builder.HasKey(b => new { b.Id, b.RequestId, b.CreatedAt });
    // builder.OwnsOne(b => b.UserId);
    // builder.Property<bool>("_active").HasColumnName("Active");
  }
}
