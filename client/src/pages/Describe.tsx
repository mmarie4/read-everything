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
        setTimeout(() => setErrorMessage(''), 1000);
    }

    const onUploadPicture = async (files: any) => {
        setCaption('');
        console.log(files);
        const form = new FormData();
        form.append('input', files[0]);
        form.append('targetLanguage', targetLanguage?.value as string);
        setImgUrl(URL.createObjectURL(files[0]));
        setLoading(true);
        const result = await await http.multipart({
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
            <HomeButton />
            <div className="p-16 flex flex-col bg-tertiarylight rounded shadow">
                <div className="w-4/12">
                    <LanguageInput
                        value={targetLanguage}
                        placeholder={t("targetLanguage")}
                        onChange={(value: Option | null, actionMeta: ActionMeta<Option>) => setTargetLanguage(value)}
                    />
                </div>
                <div className="flex p-8 gap-12">
                    <Dropzone onDrop={onUploadPicture}/>
                    {imgUrl && <img className="py-12" src={imgUrl} alt="Selected" style={{ width: '100px' }} />}
                </div>

                <div className="flex align-center justify-center p-4">
                    {loading && <Loader />}
                    <div className="font-bold text-black mt-12">{caption}</div>
                </div>
            </div>
        </Wrapper>
    )
}