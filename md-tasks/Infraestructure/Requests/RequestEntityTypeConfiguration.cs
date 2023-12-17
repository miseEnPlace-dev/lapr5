using DDDSample1.Domain.Requests;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DDDSample1.Infrastructure.Requests;

internal class RequestEntityTypeConfiguration : IEntityTypeConfiguration<Request>
{
  public void Configure(EntityTypeBuilder<Request> builder)
  {
    builder.HasKey(b => b.Id);
    builder.OwnsOne(b => b.State);
    builder.OwnsOne(b => b.DeviceModelId);
    builder.OwnsOne(b => b.UserId);
    builder.Property(b => b.Active).IsRequired();
  }
}
