import React, { ReactNode } from 'react';
import { LuEye } from "react-icons/lu";

interface Props {
    p?: string;
    type?: string;
    classNameDiv?: string;
    classNameLabel?: string;
    classNameInput?: string;
    children?: ReactNode;
    onChange?: any;
    placeholder?: string;
}

const ClientInput = ({
    p = "Name ", type = "text", classNameDiv, classNameLabel, classNameInput, children, onChange, placeholder
}: Props) => {
    return (
        <div className={classNameDiv}>
            <label className={classNameLabel}>{p}</label>
            <div className="relative">
                <input type={type} className={classNameInput} onChange={onChange} placeholder={placeholder} />
                {children && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                        {children}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ClientInput;
