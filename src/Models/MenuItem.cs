using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Models
{
    public class MenuItem
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [JsonProperty("id")]
        public Guid Id { get; set; }

        [JsonProperty("itemId")]
        public Guid ItemId { get; set; }

        [ForeignKey("ItemId")]
        [JsonProperty("item")]
        public virtual Item Item { get; set; }

        [JsonProperty("guestId")]
        public Guid GuestId { get; set; }

        [ForeignKey("GuestId")]
        [JsonProperty("guest")]
        public virtual Guest Guest { get; set; }

        [JsonProperty("isChoosed")]
        public bool IsChoosed { get; set; }
    }
}