using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using MDTasks.Infrastructure;
using MDTasks.Infrastructure.Shared;
using MDTasks.Domain.Shared;
using MDTasks.Infrastructure.Requests;
using MDTasks.Infrastructure.Tasks;
using MDTasks.Services;

namespace MDTasks
{
  public class Startup
  {
    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
      // services.AddDbContext<MDTasksDbContext>(opt =>
      //     opt.UseInMemoryDatabase("MDTasksDB")
      //     .ReplaceService<IValueConverterSelector, StronglyEntityIdValueConverterSelector>());

      // services.AddDbContext<SqliteDatabaseContext>(opt => opt.UseSqlite()
      //      .ReplaceService<IValueConverterSelector, StronglyEntityIdValueConverterSelector>());

      services.AddDbContext<MySQLDbContext>(opt =>
          opt.UseMySql(Configuration.GetConnectionString("DefaultConnection"), ServerVersion.AutoDetect(Configuration.GetConnectionString("DefaultConnection")))
          .ReplaceService<IValueConverterSelector, StronglyEntityIdValueConverterSelector>());


      services.AddCors(options =>
            {
              options.AddPolicy("AllowAnyOrigin",
                  builder => builder
                      .AllowAnyMethod()
                      .AllowAnyHeader()
                      .AllowAnyOrigin());
            });

      ConfigureMyServices(services);
      services.AddControllers().AddNewtonsoftJson();
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
      if (env.IsDevelopment())
        app.UseDeveloperExceptionPage();
      else
        app.UseHsts();
      // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.


      app.UseCors("AllowAnyOrigin");

      // app.UseHttpsRedirection();

      app.UseRouting();

      app.UseAuthorization();

      app.UseEndpoints(endpoints =>
      {
        endpoints.MapControllers();
      });
    }

    public void ConfigureMyServices(IServiceCollection services)
    {
      services.AddTransient<IUnitOfWork, UnitOfWork>();

      services.AddTransient<ITaskRepository, RequestRepository>();
      services.AddTransient<ITaskService, TaskService>();

      services.AddTransient<ISurveillanceRequestRepository, SurveillanceRequestRepository>();
      services.AddTransient<IPickAndDeliveryRequestRepository, PickAndDeliveryRequestRepository>();
      services.AddTransient<IRequestService, RequestService>();
    }
  }
}
