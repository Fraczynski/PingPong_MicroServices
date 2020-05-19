using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Reservation_Service.Data;
using AutoMapper;
using System.Net.Http;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace Reservation_Service
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
            services.AddControllers().AddNewtonsoftJson();
            services.AddScoped<IReservationRepository, ReservationRepository>();
            services.AddDbContext<DataContext>(x => x.UseMySql(Configuration.GetConnectionString("DefaultConnection")));
            services.AddAutoMapper(typeof(ReservationRepository).Assembly);
            string publicAuthorizationKey;
            using (var httpClient = new HttpClient())
            {
                using (var response = httpClient.GetAsync("http://localhost:5100/api/auth/publickey"))
                {
                    publicAuthorizationKey = response.Result.Content.ReadAsStringAsync().Result;
                }
            }
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(
                options =>
                {
                    var key = PingPongMicro.TokenHelper.BuildRsaSigningKey(publicAuthorizationKey);
                    options.TokenValidationParameters = PingPongMicro.TokenHelper.GetTokenValidationParameters(key);
                });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            //app.UseHttpsRedirection();

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
