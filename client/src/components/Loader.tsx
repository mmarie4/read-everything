import { FC } from "react";
import '../styles/Loader.css';

export const Loader: FC = () => {
    return (
        <svg width="48" height="24" viewBox="0 0 48 24" xmlns="http://www.w3.org/2000/svg">
            <rect className="spinner_hzlK" x="1" y="1" width="6" height="22"/>
            <rect className="spinner_hzlK spinner_koGT" x="9" y="1" width="6" height="22"/>
            <rect className="spinner_hzlK spinner_YF1u" x="17" y="1" width="6" height="22"/>
            <rect className="spinner_hzlK spinner_4th" x="25" y="1" width="6" height="22"/>
            <rect className="spinner_hzlK spinner_5th" x="33" y="1" width="6" height="22"/>
            <rect className="spinner_hzlK spinner_6th" x="41" y="1" width="6" height="22"/>
        </svg>
    );
}
