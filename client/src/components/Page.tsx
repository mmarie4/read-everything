import { FC, ReactNode } from "react";
import { Toast } from "./Toast";

export interface WrapperProps {
    children: ReactNode;
    errorMessage?: string;
}

export const Page: FC<WrapperProps> = (props: WrapperProps) => {
    return (
        <div className="bg-gradient-to-b from-primary to-primarylight flex flex-col items-center justify-center flex-1 w-full basis-full h-full p-4">
            <div className="flex-1">
                {props.children}
            </div>

            <Toast content={props.errorMessage}/>

            <div className="sticky flex justify-end p-2 text-secondary font-bold text-xs bottom-0 w-screen">
                <p className="mr-4">Max MARIE - 2024</p>
                <a href="https://github.com/mmarie4/read-everything" target="_blank" rel="noreferrer" className="underline mr-4">github</a>
            </div>
        </div>
    );
}