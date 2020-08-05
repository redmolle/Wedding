using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Models
{
    public class Item
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [JsonProperty("id")]
        public Guid Id { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("categoryId")]
        public Guid CategoryId { get; set; }

        [ForeignKey("CategoryId")]
        [JsonProperty("category")]
        public virtual Category Category { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [JsonProperty("sortOrder")]
        public int SortOrder { get; set; }
    }
}
