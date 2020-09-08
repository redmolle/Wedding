using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DbRepository;
using DbRepository.Interfaces;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Models;

namespace WeddingApp
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var host = CreateHostBuilder(args).Build();

            var appSettings = AppSettings.GetAppSettings();

            using (var scope = host.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
                var factory = services.GetRequiredService<IRepositoryContextFactory>();
                var environment = services.GetService<IWebHostEnvironment>();
                using (var context = factory.CreateDbContext(appSettings.ConnectionString))
                {
                    if (environment.IsDevelopment())
                        await DbInitializer.Initialize(context, appSettings);
                }
            }

            host.Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
