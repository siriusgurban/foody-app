
import React, { useRef } from 'react';

interface Props {
    p?: string;
    className: string;
    classNameSelect?: string;
    getText?: (text: string) => void;
}

const AdminModalDropdown = ({ p = 'Category', className, classNameSelect, getText }: Props) => {
    const ref = useRef<HTMLSelectElement>(null);

    const handleChange = () => {
        if (ref.current && getText) {
            getText(ref.current.value);
        }
    };

    return (
        <div className={className}>
            <p className="text-base font-medium mb-1 text-admin-text">{p}</p>
            <select
                className={classNameSelect}
                defaultValue=""
                ref={ref}
                onChange={handleChange}
            >
                <option value="" disabled>
                    Select a category
                </option>
                <option value="fast-food">Fast Food</option>
                <option value="drink">Drink</option>
                <option value="ice-cream">Ice Cream</option>
                <option value="sea-food">Sea Food</option>
            </select>
        </div>
    );
}

export default AdminModalDropdown;
