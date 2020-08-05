using DbRepository.Interfaces;
using Microsoft.EntityFrameworkCore;
using Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DbRepository.Factories
{
    public class RepositoryContextFactory : IRepositoryContextFactory
    {
        public RepositoryContext CreateDbContext(string connectionString)
        {
            var optionsBuilder = new DbContextOptionsBuilder<RepositoryContext>();
            optionsBuilder.UseNpgsql(connectionString);

            return new RepositoryContext(optionsBuilder.Options);
        }

        //public RepositoryContext CreateDbContext(string[] args)
        //{
        //    var appSettings = AppSettings.GetAppSettings();
        //    var context = CreateDbContext(appSettings.ConnectionString);
        //    DbInitializer.Initialize(context, appSettings);

        //    return context;
        //}
    }
}
