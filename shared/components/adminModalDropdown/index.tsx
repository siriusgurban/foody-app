
import React from 'react'

interface Props {
    p?: string;
    className: string;
}

const AdminModalDropdown = ({ p = 'category', className }: Props) => {
    return (
        <div className={className}>
            <p className="text-base font-medium   text-admin-text mb-1">{p}</p>
            <select
                className=" bg-admin-input w-full   text-admin-text rounded-2xl   pl-3 font-medium text-base py-4 font-display"
                defaultValue={""}
            >
                <option value="" disabled>
                    Category
                </option>
                <option value="mc">
                    mc
                </option>
                <option value="mc">
                    kfc
                </option>

            </select>
        </div>
    )
}

export default AdminModalDropdown