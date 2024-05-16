/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useState } from "react"
import http from "../utils/http"
import { Wrapper } from "../components/Wrapper";
import { LanguageInput } from "../components/LanguageInput";
import { ActionMeta } from "react-select";
import { Option } from "../types/Option";
import t from "../translations/i18n";

export const Describe: FC = () => {
    const [targetLanguage, setTargetLanguage] = useState<string>('en' as string);
    const [form, setForm] = useState<FormData>(new FormData());
    const [errorMessage, setErrorMessage] = useState<string>('');
    const onError = (errorMessage: string) => {
        setErrorMessage(errorMessage);
        setTimeout(() => setErrorMessage(''), 1000);
      }

    const sendPicture = async () => {
        await http.multipart({
            endpoint: '/describe',
            content: form,
            errorCallback: (errorMessage: string) => onError(errorMessage)
        });
    }
    
    return (
        <Wrapper errorMessage={errorMessage}>
            <div className="p-64">
            <LanguageInput
                placeholder={t("targetLanguage")}
                onChange={(value: Option | null, actionMeta: ActionMeta<Option>) => setTargetLanguage(value?.value as string)} />
            </div>
        </Wrapper>
    )
}