import { FC } from "react"
import t from "../translations/i18n";
import Select from "react-select";
import { Option } from "../types/Option";
import { ActionMeta } from "react-select";

export interface LanguageInputProps {
    placeholder: string;
    value: Option | null;
    onChange: (value: Option | null, actionMeta: ActionMeta<Option>) => void;
}

export const LanguageInput: FC<LanguageInputProps> = (props: LanguageInputProps) => {
    const options = [
        {label: t("lang.english"), value: "en"},
        {label: t("lang.german"), value: "de"},
        {label: t("lang.french"), value: "fr"},
        {label: t("lang.chinese"), value: "zh"}
    ];

    return (
        <Select
            placeholder={props.placeholder}
            options={options}
            onChange={props.onChange}
            value={props.value}
        />
    );
}