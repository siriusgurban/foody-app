import { useRouter } from 'next/router'
import React from 'react'

const HeaderUserList = ({ onToggle }: { onToggle: any }) => {
  const { push, reload } = useRouter()

  function deleteUser() {
    reload()
    localStorage.removeItem('userInfo')
  }

  return (
    <ul className="absolute top-12 w-[160px]   bg-client-white z-50 hidden sm:flex flex-col gap-1 p-4 shadow-xl rounded-md">
      <li
        className=" font-medium hover:bg-client-fill-gray border-b   pb-1 cursor-pointer "
        onClick={() => {
          push('/user?page=profile'), onToggle()
        }}
      >
        Profile
      </li>
      <li
        className=" font-medium hover:bg-client-fill-gray  border-b pb-1 cursor-pointer "
        onClick={() => {
          push('/user?page=basket'), onToggle()
        }}
      >
        Your Basket
      </li>
      <li
        className=" font-medium hover:bg-client-fill-gray  border-b  pb-1 cursor-pointer "
        onClick={() => {
          push('/user?page=orders'), onToggle()
        }}
      >
        Your Orders
      </li>
      <li
        className=" font-medium hover:bg-client-fill-gray  border-b  pb-1 cursor-pointer "
        onClick={() => {
          push('/user?page=checkout'), onToggle()
        }}
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
