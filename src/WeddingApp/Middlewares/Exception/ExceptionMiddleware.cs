using Microsoft.AspNetCore.Http;
using Models;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;

namespace WeddingApp.Middlewares.Exception
{
    public class ExceptionMiddleware
    {
        public ExceptionMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        private readonly RequestDelegate _next;

        public async Task InvokeAsync(HttpContext httpContext)
        {
            try
            {
                await _next(httpContext);
            }
            catch (KeyNotFoundException ex)
            {
                await HandleExceptionAsync(httpContext, ex, HttpStatusCode.NotFound);
            }
            catch (System.Exception ex)
            {
                await HandleExceptionAsync(httpContext, ex, HttpStatusCode.BadRequest);
            }
        }

        private Task HandleExceptionAsync(HttpContext context, System.Exception exception, HttpStatusCode statusCode = HttpStatusCode.InternalServerError)
        {
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)statusCode;
            return context.Response.WriteAsync(new ErrorDetails()
            {
                StatusCode = context.Response.StatusCode,
                Message = exception.Message
            }.ToString());
        }
    }
}
