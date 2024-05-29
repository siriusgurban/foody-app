import { useRouter } from 'next/router'
import React from 'react'

const HeaderUserList = () => {
  const { push, reload } = useRouter()
  // console.log(pathname, 'navifgatenavifgate')

  function deleteUser() {
    reload()
    localStorage.removeItem('userInfo')
    // localStorage.removeItem('tokenObj')
  }

  return (
    <ul className="absolute top-12 w-[160px]   bg-client-white z-50 hidden sm:flex flex-col gap-1 p-4 shadow-xl rounded-md">
      <li
        className=" font-medium hover:bg-client-fill-gray border-b   pb-1 cursor-pointer "
        onClick={() => push('/user?page=profile')}
      >
        Profile
      </li>
      <li
        className=" font-medium hover:bg-client-fill-gray  border-b pb-1 cursor-pointer "
        onClick={() => push('/user?page=basket')}
      >
        Your Basket
      </li>
      <li
        className=" font-medium hover:bg-client-fill-gray  border-b  pb-1 cursor-pointer "
        onClick={() => push('/user?page=orders')}
      >
        Your Orders
      </li>
      <li
        className=" font-medium hover:bg-client-fill-gray  border-b  pb-1 cursor-pointer "
        onClick={() => push('/user?page=checkout')}
      >
        Checkout
      </li>
      <li
        className=" font-medium hover:bg-client-fill-gray  border-b  cursor-pointer "
        onClick={deleteUser}
      >
        Logout
      </li>
    </ul>
  )
}

export default HeaderUserList
