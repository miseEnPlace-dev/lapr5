using Microsoft.EntityFrameworkCore;
using MDTasks.Domain.Requests;
using MDTasks.Infrastructure.Task;
using MDTasks.Infrastructure.Request;
using MDTasks.Domain.Tasks;

namespace MDTasks.Infrastructure;

public class MySQLDbContext : DbContext
{
  public DbSet<DeviceTask> Requests { get; set; }

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
