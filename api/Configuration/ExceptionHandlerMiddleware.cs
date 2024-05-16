using ReadEverythingApi.Exceptions;

public record ResponseModel(string Message, int StatusCode, bool Success);

public class ExceptionHandleMiddleware
 {
     private readonly RequestDelegate _next;

     public ExceptionHandleMiddleware(RequestDelegate next)
     {
         _next = next;
     }

     public async Task Invoke(HttpContext httpContext)
     {
         try
         {
             await _next(httpContext);
         }
         catch (Exception ex)
         {
             await HandleException(ex, httpContext);
         }
     }

     private async Task HandleException(Exception ex, HttpContext httpContext)
     {
         if (ex is DomainException)
         {
             httpContext.Response.StatusCode = 400;         
             await httpContext.Response.WriteAsJsonAsync(new ResponseModel(ex.Message, 400, false));
         }
         else
         {
             await httpContext.Response.WriteAsync("Unknown error");
         }


     }
 }

 public static class ExceptionHandleMiddlewareExtensions
 {
     public static IApplicationBuilder UseExceptionHandleMiddleware(this IApplicationBuilder builder)
     {
         return builder.UseMiddleware<ExceptionHandleMiddleware>();
     }
 }