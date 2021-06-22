using dal.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using core.Logger;
using bll.Bases;
using bll.Services;
using dal.Bases;
using core.Tools;
using dal.Repositories;
using System.Text.Json;
using Microsoft.AspNetCore.Http;
using core.Bases;
using dal.Entities;

namespace api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection _services)
        {   
      
            _services.
                AddControllers().
                AddJsonOptions(o => o.JsonSerializerOptions.PropertyNamingPolicy = null);

            _services.AddDbContext<DalDbContext>(o =>
            {
                o.UseNpgsql(
                    Configuration.GetConnectionString("Base"),
                    x => x.UseNetTopologySuite());
            });

            _services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            _services.AddScoped<IUnitOfWork, UnitOfWork>();

            _services.AddScoped<ILogService, LogService>();

            _services.AddScoped<IUserService, UserService>();

            _services.AddScoped<IIncomeService, IncomeService>();

            _services.AddScoped<IExpenseService, ExpenseService>();

            _services.AddScoped<ILoanService, LoanService>();

            _services.AddScoped<ICreditCardService, CreditCardService>();

            _services.AddScoped<ICreditCardInstallmentService, CreditCardInstallmentService>();

            _services.AddScoped<ICreditCardPeriodService, CreditCardPeriodService>();

            _services.AddScoped<IAccountService, AccountService>();

            _services.AddScoped<IProjectService, ProjectService>();

            _services.AddScoped<IProjectItemService, ProjectItemService>();

            _services.AddCors(o => o.AddPolicy(
                "CorsPolicy",
                _builder => _builder.
                    AllowAnyOrigin().
                    AllowAnyMethod().
                    AllowAnyHeader()));
        }

        public void Configure(
            IApplicationBuilder _app,
            IWebHostEnvironment _env,
            ILoggerFactory _loggerFactory)
        {
            if (_env.IsDevelopment())
            {
                _app.UseDeveloperExceptionPage();
            }

            _loggerFactory.AddProvider(
                new LoggerProvider(Configuration["Logging:Directory"]));

            _app.UseCors("CorsPolicy");

            _app.UseHttpsRedirection();

            _app.UseRouting();

            _app.UseAuthorization();

            _app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            HttpTool.Instance.Configure(
                _app.ApplicationServices.GetRequiredService<IHttpContextAccessor>());
        }
    }
}
