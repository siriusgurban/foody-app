import React, { useState } from "react";
interface AdminDropdownProps {
  className2: string;
}

const AdminDropdown: React.FC<AdminDropdownProps> = ({ className2 }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');


  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  return (


    <div className={className2} style={{ position: 'relative' }}>
      <select
        value={selectedCategory}
        onChange={handleCategoryChange}
        className="px-4 py-2 rounded-2xl appearance-none flex-1 mr-4 text-sm text-admin-secondary-select bg-admin-input width-200"
        style={{
          paddingRight: '32px', backgroundImage: `url(<svg width="28" height="27" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg" link="http://www.w3.org/1999/xlink">
      <desc>Created with Pixso.</desc>
      <path id="arrow_back_ios" d="M4.51 7.3L2.44 9.3L14 20.43L25.54 9.29L23.48 7.3L14 16.44L4.51 7.3Z" fill="#C7C7C7" fill-opacity="1.000000" fill-rule="nonzero"/>
    </svg>)` }}
      >
        <option value="">All Categories</option>
        <option value="italian">MC</option>
        <option value="chinese">Papap Johns</option>
        <option value="indian">Ocaqbasi</option>
      </select>
    </div>



  );
};

export default AdminDropdown;




