import { FC } from "react"
import { Button } from "../components/Button"
import t from "../translations/i18n"
import { Headline } from "../components/Headline"
import { Wrapper } from "../components/Wrapper"
import { useNavigate } from "react-router-dom"

export const Home: FC = () => {

    const navigate = useNavigate();

    return (
        <Wrapper>
            <div className="py-32 ">
                <Headline translationKey="home.headline"/>
                <div className ="w-100 p-12 md:flex justify-center align-center gap-12">
                    <Button text={t("home.button.describe")} onClick={() => navigate('describe')}/>
                    <Button text={t("home.button.read-text")} onClick={() => navigate('read-text')}/>
                </div>
            </div>
        </Wrapper>
    )
}