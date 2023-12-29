using DDDSample1.Domain.Requests;
using DDDSample1.Domain.User;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DDDSample1.Infrastructure.Requests
{
  internal class RequestEntityTypeConfiguration : IEntityTypeConfiguration<Request>
  {
    public void Configure(EntityTypeBuilder<Request> builder)
    {
      // builder.ToTable("Requests", SchemaNames.DDDSample1);
      builder.HasKey(b => new { b.Id, b.DeviceTaskId, b.RequestedAt });
      builder.Property(b => b.State).HasConversion(s => s.State, s => new RequestState(s)).HasColumnName("State");
      // builder.OwnsOne(b => b.UserId);
      // builder.Property<bool>("_active").HasColumnName("Active");
    }
  }
}
