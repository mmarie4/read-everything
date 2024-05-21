import { FC } from "react";
import t from "../translations/i18n";
import { useNavigate } from "react-router-dom";


export const HomeButton: FC = () => {

    const navigate = useNavigate();

    return (
        <div className="text-md text-secondary font-bold pointer-cursor flex items-center justify-center cursor-pointer" onClick={() => navigate('/')}>
        <svg width="16px" stroke-width="4px" height="16px" viewBox="0 0 512 512" data-name="Layer 1" id="Layer_1" stroke="#E8CF49" fill="#E8CF49" ><path d="M34,256,210,80l21.21,21.2L91.4,241H478v30H91.4L231.25,410.84,210,432Z"/></svg>
        <p className="ml-2 text-secondary">{t("button.home")}</p>
        </div>
    )
}