using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using HomePageService.Data;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Net.Http;
using HomePageService.Helpers;

namespace HomePageService
{
    public class Startup
    {
        private string publicAuthorizationKey;

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
            using (var httpClient = new HttpClient())
            {
                using (var response = httpClient.GetAsync("http://localhost:5100/api/auth/publickey"))
                {
                    publicAuthorizationKey = response.Result.Content.ReadAsStringAsync().Result;
                }
            }
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(
                options =>
                {
                var key = PingPongMicro.TokenHelper.BuildRsaSigningKey(publicAuthorizationKey);
                options.TokenValidationParameters = PingPongMicro.TokenHelper.GetTokenValidationParameters(key);
                });

            services.AddControllers().AddNewtonsoftJson();  
            services.AddCors();
            //
            services.AddDbContext<DataContext>(x => x.UseMySql(Configuration.GetConnectionString("DefaultConnection")));
            services.AddControllers();
            services.AddScoped<IPhotosRepository,PhotosRepository>();
            services.AddScoped<IDateTimeHelper,DateTimeHelper>();
            services.AddScoped<ITextRepository, TextRepository>();
            services.Configure<CloudinarySettings>(Configuration.GetSection("CloudinarySettings"));
            services.AddScoped<IAlertsRepository, AlertsRepository>();
            services.AddAutoMapper(typeof(PhotosRepository).Assembly);
            services.AddAutoMapper(typeof(AlertsRepository).Assembly);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
