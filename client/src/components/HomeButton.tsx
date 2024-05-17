import { FC } from "react";

export const HomeButton: FC = () => {
    
    const backIcon = "<";

    return (
        <div className="text-xl text-secondary font-bold pointer-cursor p-4 flex align-center justify-center">
            <span className="font-bold">{backIcon}</span>
            <a href="/" className="ml-12 text-secondary">Home</a>
        </div>
    )
}