import { FC, useState } from "react"
import http from "../utils/http"
import { Wrapper } from "../components/Wrapper";
import { LanguageInput } from "../components/LanguageInput";
import { ActionMeta } from "react-select";
import { Option } from "../types/Option";
import t from "../translations/i18n";
import { Loader } from "../components/Loader";
import { Dropzone } from "../components/Dropzone";
import { HomeButton } from "../components/HomeButton";

export const ReadText: FC = () => {
    const [sourceLanguage, setSourceLanguage] = useState<Option | null>(null);
    const [targetLanguage, setTargetLanguage] = useState<Option | null>(null);
    const [filename, setFilename] = useState<string>('' as string);
    const [imgUrl, setImgUrl] = useState<string>('' as string);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [caption, setCaption] = useState<string>('' as string);
    const [loading, setLoading] = useState<boolean>(false);
    const onError = (errorMessage: string) => {
        setErrorMessage(errorMessage);
        setFilename('');
        setCaption('');
        setImgUrl('');
        setTimeout(() => setErrorMessage(''), 2000);
    }

    const onUploadPicture = async (files: any) => {
        setCaption('');
        const form = new FormData();
        form.append('input', files[0]);
        if (!sourceLanguage?.value) {
            onError(t("validation.sourceLanguage"));
            return;
        }
        form.append('sourceLanguage', sourceLanguage.value as string);

        if (!targetLanguage?.value) {
            onError(t("validation.targetLanguage"));
            return;
        }
        form.append('targetLanguage', targetLanguage.value as string);

        setImgUrl(URL.createObjectURL(files[0]));
        setLoading(true);
        const result = await http.multipart({
            endpoint: 'read-picture',
            content: form,
            errorCallback: (errorMessage: string) => onError(errorMessage)
        });
        
        setLoading(false);
        if (result?.length > 0) {
            setCaption(result);
        }
    }
    
    return (
        <Wrapper errorMessage={errorMessage}>
            <div className="flex justify-between p-2">
                <HomeButton />
                <p className="text-secondary text-md font-bold">{t("read-text.title")}</p>
            </div>
            <div className="p-16 flex flex-col bg-tertiarylight rounded shadow p-8">
                <div className="flex w-full gap-12 mb-4">
                    <LanguageInput
                        value={sourceLanguage}
                        placeholder={t("sourceLanguage")}
                        onChange={(value: Option | null, actionMeta: ActionMeta<Option>) => setSourceLanguage(value)}
                    />
                    <LanguageInput
                        value={targetLanguage}
                        placeholder={t("targetLanguage")}
                        onChange={(value: Option | null, actionMeta: ActionMeta<Option>) => setTargetLanguage(value)}
                    />
                </div>
                <div className="flex gap-12">
                <Dropzone onDrop={onUploadPicture} imgUrl={imgUrl} filename={filename}/>
                </div>

                <div className="flex align-center justify-center mt-12">
                    {loading && <Loader />}
                    {caption?.length > 0 && <div className="font-bold text-black p-4">{caption}</div>}
                </div>
            </div>
        </Wrapper>
    )
}