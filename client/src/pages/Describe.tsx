/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useState } from "react"
import http from "../utils/http"
import { Wrapper } from "../components/Wrapper";
import { LanguageInput } from "../components/LanguageInput";
import { ActionMeta } from "react-select";
import { Option } from "../types/Option";
import t from "../translations/i18n";

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

    const onUploadPicture = async (e: any) => {
        setCaption('');
        const form = new FormData();
        form.append('input', e.target.files[0]);
        form.append('targetLanguage', targetLanguage?.value as string);
        setImgUrl(URL.createObjectURL(e.target.files[0]));
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
            <div className="py-32 flex flex-col gap-12">
                <LanguageInput
                    value={targetLanguage}
                    placeholder={t("targetLanguage")}
                    onChange={(value: Option | null, actionMeta: ActionMeta<Option>) => setTargetLanguage(value)}
                />
                <input className="py-12" type="file" accept="image/*" onInput={onUploadPicture} />
                {imgUrl && <img className="py-12" src={imgUrl} alt="Selected" style={{ width: '100px' }} />}
                {loading && <div className="font-bold text-secondary mt-12">Loading...</div>}
                <div className="font-bold text-secondary mt-12">{caption}</div>
            </div>
        </Wrapper>
    )
}