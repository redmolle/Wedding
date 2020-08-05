using System;
using System.Collections.Generic;
using System.Text;

namespace API
{
    public class HttpErrorMessage
    {
        public string Message { get; }

        public HttpErrorMessage(string errorMessage)
        {
            Message = errorMessage;
        }
    }
}
