using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace Models
{
    public class PageData<T>
    {
        public PageData()
        {
            this.Data = new List<T>();
        }

        public PageData(IEnumerable<T> data)
        {
            this.Data = data;
        }

        [JsonProperty("page")]
        public int Page { get; set; }

        [JsonProperty("rowsPerPage")]
        public int RowsPerPage { get; set; }

        [JsonProperty("count")]
        public int Count { get; set; }

        [JsonProperty("data")]
        public IEnumerable<T> Data { get; set; }
    }
}
