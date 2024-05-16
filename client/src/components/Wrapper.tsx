import { FC, ReactNode } from "react";
import { Toast } from "./Toast";

export interface WrapperProps {
    children: ReactNode;
    errorMessage: string;
}

export const Wrapper: FC<WrapperProps> = (props: WrapperProps) => {
    return (
        <div className="bg-gradient-to-b from-primary to-primarylight flex flex-col items-center justify-center flex-1 w-full basis-full h-full">
            <div className="flex-1">

            {props.children}
            </div>
            <Toast content={props.errorMessage}/>
        </div>
    );
}