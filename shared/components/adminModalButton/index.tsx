import React from 'react'
interface Props {
    onClick?: any;
    text: string;
    className: string;
}
const AdminModalButton = ({ onClick, text = "", className }: Props) => {
    return (
        <button className={className} onClick={onClick}>
            {text}
        </button>
    )
}

export default AdminModalButton