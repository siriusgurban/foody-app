
import React from 'react'

interface Props {
    p?: string;
    className: string;
    classNameSelect?: string;
}

const AdminModalDropdown = ({ p = 'category', className, classNameSelect }: Props) => {
    return (
        <div className={className}>
            <p className="text-base font-medium mb-1 text-admin-text ">{p}</p>
            <select
                className={classNameSelect}
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