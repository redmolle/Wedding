using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Intrinsics.X86;
using System.Threading.Tasks;
using API.Services.Implementation;
using API.Services.Interfaces;
using DbRepository.Factories;
using DbRepository.Interfaces;
using DbRepository.Repositories;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Models;

namespace API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
            AppSettings = AppSettings.GetAppSettings();
        }

        public IConfiguration Configuration { get; }
        public AppSettings AppSettings { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers()
                    .AddNewtonsoftJson(options =>
                    {
                        options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
                    });

            services.AddScoped<IRepositoryContextFactory, RepositoryContextFactory>();
            services.AddScoped<ICategoryRepository>(provider => new CategoryRepository(AppSettings, provider.GetService<IRepositoryContextFactory>()));
            services.AddScoped<IDishRepository>(provider => new DishRepository(AppSettings, provider.GetService<IRepositoryContextFactory>()));
            services.AddScoped<IGuestRepository>(provider => new GuestRepository(AppSettings, provider.GetService<IRepositoryContextFactory>()));
            services.AddScoped<IMealRepository>(provider => new MealRepository(AppSettings, provider.GetService<IRepositoryContextFactory>()));
            services.AddScoped<IGuestService, GuestService>();
            services.AddScoped<IMenuService, MenuService>();
            services.AddHttpClient();

            services.AddCors();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseCors(options =>
            options.AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod());

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.ConfigureCustomExceptionMiddleware();

            //app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
