import React, { FC } from 'react'

interface CategoryDropdownProps {
    categories: { id: string, name: string }[]
    selectedCategory: string
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const CategoryDropdown: FC<CategoryDropdownProps> = ({ categories, selectedCategory, onChange }) => {
    return (
        <select value={selectedCategory} onChange={onChange}>
            <option value="All">All</option>
            {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
            ))}
        </select>
    )
}

export default CategoryDropdown
