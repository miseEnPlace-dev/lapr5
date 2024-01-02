using Microsoft.EntityFrameworkCore;
using MDTasks.Infrastructure.Requests;
using MDTasks.Infrastructure.Tasks;
using MDTasks.Domain.Task;
using MDTasks.Domain.Request;

namespace MDTasks.Infrastructure;

public class MySQLDbContext : DbContext
{
  public DbSet<DeviceTask> Tasks { get; set; }

  public DbSet<SurveillanceRequest> SurveillanceRequests { get; set; }
  public DbSet<PickAndDeliveryRequest> PickAndDeliveryRequests { get; set; }

  public string ConnectionString { get; set; }
  public MySQLDbContext(DbContextOptions<MySQLDbContext> options) : base(options) { }

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    modelBuilder.ApplyConfiguration(new TaskEntityTypeConfiguration());
    modelBuilder.ApplyConfiguration(new PickAndDeliveryRequestEntityTypeConfiguration());
    modelBuilder.ApplyConfiguration(new SurveillanceRequestEntityTypeConfiguration());
  }
}
