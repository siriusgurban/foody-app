
import React, { useRef } from 'react'

interface Props {
    p?: string;
    className: string;
    placeHolder: string;
    getText?: (text: string) => void;
}
const AdminModalTextArea = ({ p = "desc", className, placeHolder, getText }: Props) => {
    const ref = useRef<HTMLTextAreaElement>(null);

    const handleBlur = () => {
        if (ref.current && getText) {
            getText(ref.current.value);
        }
    }; return (
        <div className={className}>
            <p className=" text-admin-text font-medium  mb-2   text-base font-display">{p}</p>
            <textarea
                className=" w-full  rounded-2xl h-24  font-medium text-base text-admin-modal-placeholder pt-2 pl-4  bg-admin-input capitalize font-display"
                placeholder={placeHolder}
                ref={ref}
                onBlur={handleBlur}
            ></textarea>
        </div>
    )
}

export default AdminModalTextArea