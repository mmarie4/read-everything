import { FC } from "react";
import t from "../translations/i18n";

export const HomeButton: FC = () => {
    
    const backIcon = "<";

    return (
        <div className="text-md text-secondary font-bold pointer-cursor flex align-center justify-center">
            <span className="font-bold">{backIcon}</span>
            <a href="/" className="ml-2 text-secondary">{t("button.home")}</a>
        </div>
    )
}