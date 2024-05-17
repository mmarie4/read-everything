using ReadEverythingApi.Exceptions;

namespace ReadEverythingApi.Extensions.Validators;

public static class CaptionPictureCommandValidator
{
    public static void Validate(this CaptionPictureCommand request)
    {
        if (request.File is null)
            throw new DomainException("No file provided");

        if (string.IsNullOrEmpty(request.TargetLanguage))
            throw new DomainException("No target language provided");
    }
}