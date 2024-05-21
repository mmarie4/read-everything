using System.Globalization;
using ReadEverythingApi.Exceptions;

namespace ReadEverythingApi.Extensions.Validators;

public static class ReadPictureTextCommandValidator
{
    public static void Validate(this ReadPictureTextCommand request)
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

        if (string.IsNullOrEmpty(request.SourceLanguage))
            throw new DomainException(Errors.NoSourceLanguageProvided);

        try
        {
            var culture = CultureInfo.GetCultureInfo(request.SourceLanguage);
        }
        catch (CultureNotFoundException)
        {
            throw new DomainException(Errors.InvalidSourceLanguage);
        }
    }
}