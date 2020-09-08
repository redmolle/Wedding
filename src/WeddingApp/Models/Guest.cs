using Newtonsoft.Json;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WeddingApp.Models
{
    public class Guest
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [JsonProperty("id")]
        public Guid Id { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("message")]
        public string Message { get; set; }

        [JsonProperty("isConfirmedInvite")]
        public bool IsConfirmedIvite { get; set; }

        [JsonProperty("isCanBeInZAGS")]
        public bool IsCanBeInZAGS { get; set; }

        [JsonProperty("isConfirmedZAGS")]
        public bool IsConfirmedZAGS { get; set; }

        [JsonProperty("meal")]
        public virtual Meal Meal { get; set; }
    }
}
