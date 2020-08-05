using DbRepository.Interfaces;
using Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DbRepository.Repositories
{
    public abstract class BaseRepository
    {
        public BaseRepository(AppSettings settings, IRepositoryContextFactory contextFactory)
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
