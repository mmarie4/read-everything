import { FC } from "react"

export interface ButtonProps {
    text: string;
    onClick: () => void;
}

export const Button: FC<ButtonProps> = (props: ButtonProps) => {
    return (
        <button
            className="rounded-xl border border-secondarylight px-12 py-8 font-bold text-secondary bg-tertiary hover:bg-tertiarylight"
            onClick={props.onClick}
        >
            {props.text}
        </button>
    )
}