import React, { ReactNode } from 'react'
interface Props {
    onClick?: any;
    text?: string;
    className?: string;
    children?: ReactNode;
}
const AdminModalButton = ({ onClick, text = "", className, children }: Props) => {
    return (
        <button className={className} onClick={onClick}>
            {children}
            {text}
        </button>
    )
}

export default AdminModalButton