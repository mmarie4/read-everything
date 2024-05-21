using Azure;
using Azure.AI.Vision.ImageAnalysis;
using MediatR;
using ReadEverythingApi.Commands;
using ReadEverythingApi.Exceptions;
using ReadEverythingApi.Extensions.Validators;

public record ReadPictureTextCommand(IFormFile File, string TargetLanguage, string? SourceLanguage = null) : IRequest<string>;

public class ReadPictureTextCommandHandler(IConfiguration configuration, IMediator mediator) : IRequestHandler<ReadPictureTextCommand, string>
{
    private readonly ImageAnalysisClient _imageAnalysisClient = new ImageAnalysisClient(
            new Uri(configuration.GetValue<string>("AzureImageAnalysis:Endpoint") ?? string.Empty),
            new AzureKeyCredential(configuration.GetValue<string>("AzureImageAnalysis:Key") ?? string.Empty));

    private readonly IMediator _mediator = mediator;

    public async Task<string> Handle(ReadPictureTextCommand request, CancellationToken cancellationToken)
    {
        request.Validate();
        
        using var stream = request.File.OpenReadStream();

        var result = await _imageAnalysisClient.AnalyzeAsync(
            BinaryData.FromStream(stream),
            VisualFeatures.Read,
            cancellationToken: cancellationToken);

        if (string.IsNullOrEmpty(result?.Value?.Caption?.Text))
            throw new DomainException(Errors.CannotReadText);

        var text = string
            .Join("\n", result.Value.Read.Blocks.SelectMany(b => b.Lines.Select(l => l.Text)))
            .Replace("\n", " ");

        var translated = await _mediator.Send(new TranslateCommand(text, request.TargetLanguage, request.SourceLanguage), cancellationToken);

        return translated;
    }
}