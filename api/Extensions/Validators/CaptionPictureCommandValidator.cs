using System.Globalization;
using ReadEverythingApi.Exceptions;

namespace ReadEverythingApi.Extensions.Validators;

public static class CaptionPictureCommandValidator
{
    public static void Validate(this CaptionPictureCommand request)
    {
        if (request.File is null)
            throw new DomainException(Errors.NoFileProvided);

        if (string.IsNullOrEmpty(request.TargetLanguage))
            throw new DomainException(Errors.NoTargetLanguageProvided);

        try
        {
            var culture = CultureInfo.GetCultureInfo(request.TargetLanguage);
        }
        catch (CultureNotFoundException)
        {
            throw new DomainException(Errors.InvalidTargetLanguage);
        }
    }
}