using Azure;
using Azure.AI.Translation.Text;
using MediatR;
using ReadEverythingApi.Exceptions;

namespace ReadEverythingApi.Commands;

public record TranslateCommand(string Text, string TargetLanguage, string? SourceLanguage = null) : IRequest<string>;

public class TranslateCommandHandler(IConfiguration configuration) : IRequestHandler<TranslateCommand, string>
{
    private readonly TextTranslationClient _client = new TextTranslationClient(
            new AzureKeyCredential(configuration.GetValue<string>("AzureTranslator:Key") ?? string.Empty),
            new Uri(configuration.GetValue<string>("AzureTranslator:Endpoint") ?? string.Empty));

    public async Task<string> Handle(TranslateCommand request, CancellationToken cancellationToken)
    {
        if (request.SourceLanguage == request.TargetLanguage)
            return request.Text;
            
        var result = await _client.TranslateAsync(
            request.TargetLanguage,
            request.Text,
            request.SourceLanguage,
            cancellationToken: cancellationToken);

        if (result?.Value?.Any() != true)
            throw new DomainException(Errors.CannotTranslateText);

        var translation = result!.Value.FirstOrDefault(v => v.DetectedLanguage?.Language == request.SourceLanguage)
            ?? result.Value.OrderByDescending(v => v.DetectedLanguage?.Score).First();

        return translation.Translations[0].Text;
    }
}