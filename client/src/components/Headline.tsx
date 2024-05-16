import { FC } from "react";
import t from "../translations/i18n"

export interface HeadlineProps extends React.HTMLProps<HTMLDivElement> {
    translationKey: string
    secondaryKey?: string
}

export const Headline: FC<HeadlineProps>  = (props: HeadlineProps) => {
    return (
        <div className="mb-2">
            <p className="font-bold text-xl text-secondary">{t(props.translationKey)}</p>
            {props.secondaryKey
                ? <p className="text-md text-primary">{t(props.secondaryKey)}</p>
                : null
            }
        </div>
    );
}