using ReadEverythingApi.Exceptions;

namespace ReadEverythingApi.Extensions.Validators;

public static class ReadPictureTextCommandValidator
{
    public static void Validate(this ReadPictureTextCommand request)
    {
        if (request.File is null)
            throw new DomainException("No file provided");

        if (string.IsNullOrEmpty(request.TargetLanguage))
            throw new DomainException("No target language provided");

        if (string.IsNullOrEmpty(request.SourceLanguage))
            throw new DomainException("No source language provided");
    }
}