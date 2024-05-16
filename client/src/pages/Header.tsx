import { FC } from "react";
import { getLocaleToDisplay, setLocale } from "../translations/i18n";
import { useNavigate } from "react-router-dom";
import { locales } from "../translations/i18n.constants";

export const Header: FC = () => {

    const currentLocale = getLocaleToDisplay();
    const navigate = useNavigate();

    const onClickLocale = (locale: string) => {
        setLocale(locale);
        navigate(0);
    }

    return (
    <div className="p-4 w-full h-12 bg-primary static flex justify-between items-center shadow">
        <p className="font-bold text-xl text-secondary">Read everything</p>

        <div className="font-semibold text-secondarylight py-1 px-3 text-xs flex">
            <div className={currentLocale === "EN" ? "font-bold" : "cursor-pointer font-semibold hover:text-secondary"} onClick={() => onClickLocale(locales.en)}>EN</div>
            <div className="px-2"> - </div>
            <div className={currentLocale === "FR" ? "font-bold" : "cursor-pointer font-semibold hover:text-secondary"} onClick={() => onClickLocale(locales.fr)}>FR</div>
        </div>
    </div>
    );
};