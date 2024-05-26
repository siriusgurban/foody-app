import React from 'react'

interface Props {
    p?: string;
    type?: string;
    className2: string;
    placeHolder: string;
}

const AdminModalInput = ({ p = "Name ", type = "text", className2, placeHolder
}: Props) => {
    return (
        <div className={className2}>
            <p className=" font-medium   text-admin-text  text-base font-display">{p}</p>
            <input type={type} className="rounded-2xl  text-whiteLight  font-medium text-base  bg-admin-input   text-admin-modal-placeholder pl-5 py-3  capitalize font-display" placeholder={placeHolder}/>
        </div>
    )
}

export default AdminModalInput