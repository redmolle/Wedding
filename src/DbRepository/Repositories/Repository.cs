using DbRepository.Interfaces;
using Microsoft.EntityFrameworkCore;
using Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DbRepository.Repositories
{
    public abstract class Repository
    {
        public Repository(AppSettings settings, IRepositoryContextFactory contextFactory)
        {
            this.ConnectionString = settings.ConnectionString;
            this.ContextFactory = contextFactory;
        }

        private string ConnectionString { get; set; }
        
        private IRepositoryContextFactory ContextFactory { get; set; }

        protected RepositoryContext CreateDbContext()
        {
            return this.ContextFactory.CreateDbContext(this.ConnectionString);
        }

    }
}
