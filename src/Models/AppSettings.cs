using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.IO;

namespace Models
{
    public class AppSettings
    {
        public const string SETTINGS = "Options";

        public string ConnectionString { get; set; }

        public List<Guest> Guests { get; set; }

        public List<Dish> Dishes { get; set; }

        public List<Category> Categories { get; set; }

        public static AppSettings GetAppSettings()
        {
            var config = new ConfigurationBuilder()
                 .SetBasePath(Directory.GetCurrentDirectory())
                 .AddJsonFile("appsettings.json")
                 .Build();

            var appSettings = new AppSettings();
            config.GetSection(AppSettings.SETTINGS).Bind(appSettings);

            return appSettings;
        }
    }
}
