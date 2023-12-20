using DDDSample1.Domain.Requests;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DDDSample1.Infrastructure.Requests;

internal class RequestEntityTypeConfiguration : IEntityTypeConfiguration<Request>
{
  public void Configure(EntityTypeBuilder<Request> builder)
  {
    // builder.ToTable("Requests", SchemaNames.DDDSample1);
    builder.HasKey(b => b.Id);
    builder.OwnsOne(b => b.State);
    //builder.OwnsOne(b => b.UserId);
    // builder.Property<bool>("_active").HasColumnName("Active");
  }
}
