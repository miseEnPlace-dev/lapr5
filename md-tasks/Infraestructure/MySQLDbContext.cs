using Microsoft.EntityFrameworkCore;
using DDDSample1.Domain.Requests;
using DDDSample1.Domain.DeviceTasks;
using DDDSample1.Infrastructure.Requests;
using DDDSample1.Infrastructure.Tasks;

namespace DDDSample1.Infrastructure
{
  public class MySQLDbContext : DbContext
  {
    public DbSet<Request> Requests { get; set; }
    public DbSet<DeviceTask> Tasks { get; set; }

    public string ConnectionString { get; set; }
    public MySQLDbContext(DbContextOptions<MySQLDbContext> options) : base(options)
    {

    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {

      modelBuilder.ApplyConfiguration(new RequestEntityTypeConfiguration());
      modelBuilder.ApplyConfiguration(new DeviceTaskEntityTypeConfiguration());
    }
  }
}