using Azure;
using Azure.AI.Vision.ImageAnalysis;
using MediatR;
using ReadEverythingApi.Commands;
using ReadEverythingApi.Exceptions;

public record CaptionPictureCommand(IFormFile File, string TargetLanguage, string? SourceLanguage = null) : IRequest<string>;

public class CaptionPictureCommandHandler(IConfiguration configuration, IMediator mediator) : IRequestHandler<CaptionPictureCommand, string>
{
    private readonly ImageAnalysisClient _imageAnalysisClient = new ImageAnalysisClient(
            new Uri(configuration.GetValue<string>("AzureImageAnalysis:Endpoint") ?? string.Empty),
            new AzureKeyCredential(configuration.GetValue<string>("AzureImageAnalysis:Key") ?? string.Empty));

    private readonly IMediator _mediator = mediator;

    public async Task<string> Handle(CaptionPictureCommand request, CancellationToken cancellationToken)
    {
        using var stream = request.File.OpenReadStream();

        var result = await _imageAnalysisClient.AnalyzeAsync(
            BinaryData.FromStream(stream),
            VisualFeatures.Caption,
            cancellationToken: cancellationToken);

        if (string.IsNullOrEmpty(result?.Value?.Caption?.Text))
            throw new DomainException("Cannot describe picture");

        var translated = await _mediator.Send(new TranslateCommand(result.Value.Caption.Text, request.TargetLanguage, request.SourceLanguage), cancellationToken);

        return translated;
    }
}