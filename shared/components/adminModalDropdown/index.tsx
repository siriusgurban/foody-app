import { getCategories } from '@/shared/services/category'
import { useQuery } from '@tanstack/react-query'
import React, { useRef } from 'react'

interface Props {
    p?: string
    className: string
    classNameSelect?: string
    getText?: (text: string) => void
}

const AdminModalDropdown = ({
    p = 'Category',
    className,
    classNameSelect,
    getText,
}: Props) => {
    const { data } = useQuery({
        queryFn: getCategories,
        queryKey: ['categories'],
    })

    let categories = data?.data?.result?.data

    const ref = useRef<HTMLSelectElement>(null)

    const handleChange = () => {
        if (ref.current && getText) {
            getText(ref.current.value)
        }
    }

    return (
        <div className={className}>
            <p className="text-base font-medium mb-1 text-admin-text">{p}</p>
            <select
                className={classNameSelect}
                defaultValue=""
                ref={ref}
                onChange={handleChange}
            >
                <option value="All" >All</option>
                {categories?.map((item: any, index: number) => {
                    return (
                        <option key={index} value={item?.id}>
                            {item?.name}
                        </option>
                    )
                })}
            </select>
        </div>
    )
}

export default AdminModalDropdown
