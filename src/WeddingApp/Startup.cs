using DbRepository.Factories;
using DbRepository.Interfaces;
using DbRepository.Repositories;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Models;
using WeddingApp.Services.Implementation;
using WeddingApp.Services.Interfaces;

namespace WeddingApp
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

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
