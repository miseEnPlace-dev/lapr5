using MDTasks.Domain.Request;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MDTasks.Infrastructure.Requests;

internal class RequestEntityTypeConfiguration : IEntityTypeConfiguration<Request>
{
  public void Configure(EntityTypeBuilder<Request> builder)
  {
    // builder.ToTable("Tasks", SchemaNames.MDTasks);
    builder.HasKey(b => new { b.Id, b.StartCoordinateX, b.StartCoordinateY, b.EndCoordinateX, b.EndCoordinateY, b.RequestedAt });
    builder.OwnsOne(b => b.UserId);
    builder.Property(b => b.State).HasConversion(s => s.State, s => new RequestState(s)).HasColumnName("State");
    // builder.Property<bool>("_active").HasColumnName("Active");
  }
}
