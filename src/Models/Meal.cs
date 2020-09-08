using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Models
{
    public class Meal
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [JsonProperty("id")]
        public Guid Id { get; set; }

        [JsonProperty("guestId")]
        public Guid GuestId { get; set; }

        [JsonProperty("dishId")]
        public Guid DishId { get; set; }

        [ForeignKey("GuestId")]
        [JsonProperty("guest")]
        public virtual Guest Guest { get; set; }

        [ForeignKey("DishId")]
        [JsonProperty("dish")]
        public virtual Dish Dish { get; set; }
    }
}
