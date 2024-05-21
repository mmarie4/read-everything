/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useEffect, useState } from "react"
import http from "../utils/http"
import { Wrapper } from "../components/Wrapper";
import { LanguageInput } from "../components/LanguageInput";
import { ActionMeta } from "react-select";
import { Option } from "../types/Option";
import t from "../translations/i18n";
import { Loader } from "../components/Loader";
import { HomeButton } from "../components/HomeButton";
import { Dropzone } from "../components/Dropzone";

export const Describe: FC = () => {
    const [targetLanguage, setTargetLanguage] = useState<Option | null>(null);
    const [imgUrl, setImgUrl] = useState<string>('' as string);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [caption, setCaption] = useState<string>('' as string);
    const [loading, setLoading] = useState<boolean>(false);
    const onError = (errorMessage: string) => {
        setErrorMessage(errorMessage);
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
        <Wrapper errorMessage={errorMessage}>
            <div className="flex justify-between p-2 items-center">
                <HomeButton />
                <p className="text-secondary text-md font-bold">{t("describe.title")}</p>
            </div>
            <div className="flex flex-col bg-tertiarylight rounded shadow p-8">
                <div className="w-6/12 mb-4">
                    <LanguageInput
                        value={targetLanguage}
                        placeholder={t("targetLanguage")}
                        onChange={(value: Option | null, actionMeta: ActionMeta<Option>) => setTargetLanguage(value)}
                    />
                </div>
                <div className="flex gap-12">
                    <Dropzone onDrop={onUploadPicture}/>
                    {imgUrl && <img className="     " src={imgUrl} alt="Selected" style={{ width: '100px' }} />}
                </div>

                <div className="flex align-center justify-center">
                    {loading && <Loader />}
                    {caption?.length > 0 && <div className="font-bold text-black mt-12 p-4">{caption}</div>}
                </div>
            </div>
        </Wrapper>
    )
}