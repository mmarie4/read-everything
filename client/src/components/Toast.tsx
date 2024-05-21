import { FC } from "react";

export interface ToastProps {
    content: string;
}

export const Toast: FC<ToastProps> = (props: ToastProps) => {
    if (!props.content?.length)
        return <div></div>

    return (
        <div className="fixed bottom-8 right-4 rounded bg-error opacity-75 text-md px-4 py-2 text-tertiary">
            {props.content}
        </div>
    )
}