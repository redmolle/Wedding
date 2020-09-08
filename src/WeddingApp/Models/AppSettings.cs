using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.IO;

namespace WeddingApp.Models
{
    public class AppSettings
    {
        public const string SECTION = "Options";

        public string ConnectionString { get; set; }

        public List<Guest> Guests { get; set; }

        public List<Dish> Dishes { get; set; }

        public List<Category> Categories { get; set; }

        public static AppSettings GetAppSettings(string file = null, string path = null)
        {
            path = string.IsNullOrWhiteSpace(path) ? Directory.GetCurrentDirectory() : path;
            file = string.IsNullOrWhiteSpace(file) ? "appsettings.json" : file;

            var config = new ConfigurationBuilder()
                 .SetBasePath(path)
                 .AddJsonFile(file)
                 .Build();

            var appSettings = new AppSettings();
            config.GetSection(SECTION).Bind(appSettings);

            return appSettings;
        }
    }
}
