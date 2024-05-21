import React from 'react'

const HeaderUserList = () => {
    return (
        <ul className='absolute top-12 w-[160px]   bg-client-white z-50 hidden sm:flex flex-col gap-1 p-4 shadow-xl rounded-md'>
            <li className=' font-medium hover:bg-client-fill-gray border-b   pb-1 cursor-pointer '>Profile</li>
            <li className=' font-medium hover:bg-client-fill-gray  border-b pb-1 cursor-pointer '>Your Basket</li>
            <li className=' font-medium hover:bg-client-fill-gray  border-b  pb-1 cursor-pointer '>Your Orders</li>
            <li className=' font-medium hover:bg-client-fill-gray  border-b  pb-1 cursor-pointer '>Checkout</li>
            <li className=' font-medium hover:bg-client-fill-gray  border-b  cursor-pointer '>Logout</li>
        </ul>
    )
}

export default HeaderUserList