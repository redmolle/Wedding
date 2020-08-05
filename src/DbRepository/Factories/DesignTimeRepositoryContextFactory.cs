using Microsoft.EntityFrameworkCore.Design;
using Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DbRepository.Factories
{
    public class DesignTimeRepositoryContextFactory : IDesignTimeDbContextFactory<RepositoryContext>
    {
        public RepositoryContext CreateDbContext(string[] args)
        {
            return new RepositoryContextFactory()
                .CreateDbContext(AppSettings.GetAppSettings().ConnectionString);
        }
    }
}
