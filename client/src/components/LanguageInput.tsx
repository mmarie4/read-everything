import { FC } from "react"
import t from "../translations/i18n";
import Select from "react-select";
import { Option } from "../types/Option";
import { ActionMeta, InputActionMeta } from "react-select";

export interface LanguageInputProps {
    placeholder: string;
    onChange: (value: Option | null, actionMeta: ActionMeta<Option>) => void;
}

export const LanguageInput: FC<LanguageInputProps> = (props: LanguageInputProps) => {
    const options = [
        {label: t("lang.english"), value: "en"},
        {label: t("lang.german"), value: "de"},
        {label: t("lang.french"), value: "fr"}
    ];

    return (
        <Select
            placeholder={props.placeholder}
            options={options}
            isSearchable
            onChange={props.onChange}
            inputValue={""}
            onInputChange={function (newValue: string, actionMeta: InputActionMeta): void {
                
            } }
            onMenuOpen={function (): void {
                
            } }
            onMenuClose={function (): void {
                
            } }
            value={null}        />
    );
}