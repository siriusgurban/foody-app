import React from 'react'

function HeaderAdmin() {
  return (
    <div className="flex flex-row justify-between bg-red-700 ">
      <div style={{ color: 'red' }}>Foody</div>
      <div className="flex justify-center">
        <div>+ Add Product</div>
        <div>Eng</div>
        <div>Admin</div>
      </div>
    </div>
  )
}

export default HeaderAdmin
