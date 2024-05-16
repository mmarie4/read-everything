using MediatR;
using Microsoft.AspNetCore.Mvc;
using ReadEverythingApi.Exceptions;

var builder = WebApplication.CreateBuilder(args);

// MediatR
builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblies(typeof(Program).Assembly));

var app = builder.Build();

app.UseHttpsRedirection();
app.UseExceptionHandleMiddleware();     

// Endpoints
app.MapPost("/caption-picture", async (
        [FromServices] IMediator mediator,
        [FromForm] IFormFile input,
        [FromForm] string? sourceLanguage,
        [FromForm] string targetLanguage) => await mediator.Send(new CaptionPictureCommand(input, targetLanguage, sourceLanguage)))
    .DisableAntiforgery();

app.MapPost("/read-picture", async (
        [FromServices] IMediator mediator,
        [FromForm] IFormFile input,
        [FromForm] string? sourceLanguage,
        [FromForm] string targetLanguage) => await mediator.Send(new ReadPictureTextCommand(input, targetLanguage, sourceLanguage)))
    .DisableAntiforgery();

app.Run();
