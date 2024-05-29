import { FC, useState } from "react"
import http from "../utils/http"
import { LanguageInput } from "../components/LanguageInput";
import { ActionMeta } from "react-select";
import { Option } from "../types/Option";
import t from "../translations/i18n";
import { Loader } from "../components/Loader";
import { HomeButton } from "../components/HomeButton";
import { Dropzone } from "../components/Dropzone";
import { Page } from "../components/Page";

export const Describe: FC = () => {
    const [targetLanguage, setTargetLanguage] = useState<Option | null>(null);
    const [imgUrl, setImgUrl] = useState<string>('' as string);
    const [filename, setFilename] = useState<string>('' as string);
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
        if (!targetLanguage?.value) {
            onError(t("validation.targetLanguage"));
            return;
        }
        form.append('targetLanguage', targetLanguage.value as string);

        setImgUrl(URL.createObjectURL(files[0]));
        setFilename(files[0].name);
        setLoading(true);
        const result = await http.multipart({
            endpoint: 'caption-picture',
            content: form,
            errorCallback: (errorMessage: string) => onError(errorMessage)
        });
        
        setLoading(false);
        if (result?.length > 0) {
            setCaption(result);
        }
    }
    
    return (
        <Page errorMessage={errorMessage}>
            <div className="flex justify-between p-2 items-center">
                <HomeButton />
                <p className="text-secondary text-md font-bold">{t("describe.title")}</p>
            </div>
            <div className="flex flex-col bg-tertiarylight rounded shadow p-8">
                <div className="w-full mb-4">
                    <LanguageInput
                        value={targetLanguage}
                        placeholder={t("targetLanguage")}
                        onChange={(value: Option | null, actionMeta: ActionMeta<Option>) => setTargetLanguage(value)}
                    />
                </div>
                <div className="flex gap-12">
                    <Dropzone onDrop={onUploadPicture} imgUrl={imgUrl} filename={filename}/>
                </div>

            </div>

            {(loading || caption?.length > 0) &&
                <div className="flex flex-col bg-tertiarylight rounded shadow p-4 mt-8">
                    <div className="flex align-center justify-center">
                        {loading && <Loader />}
                        {caption?.length > 0 && <div className="font-semibold text-tertiarydark text-sm">{caption}</div>}
                    </div>
                </div>
            }
        </Page>
    )
}