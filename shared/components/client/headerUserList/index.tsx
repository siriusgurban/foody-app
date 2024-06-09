import { useRouter } from 'next/router'
import React from 'react'
import { useTranslation } from 'react-i18next'

const HeaderUserList = ({ onToggle }: { onToggle: any }) => {
  const { push, reload } = useRouter()
  const { t } = useTranslation('client')

  function deleteUser() {
    reload()
    localStorage.removeItem('userInfo')
  }

  return (
    <ul className="absolute top-12 w-[160px]   bg-client-white z-50 hidden sm:flex flex-col gap-1 p-4 shadow-xl rounded-md">
      <li
        className=" font-medium border-b   pb-1 cursor-pointer hover:scale-110 transition-all duration-300 hover:bg-client-light-red"
        onClick={() => {
          push('/user?page=profile'), onToggle()
        }}
      >
        {t('Profile')}
      </li>
      <li
        className=" font-medium  border-b pb-1 cursor-pointer hover:scale-110 transition-all duration-300 hover:bg-client-light-red"
        onClick={() => {
          push('/user?page=basket'), onToggle()
        }}
      >
        {t('Your Basket')}
      </li>
      <li
        className=" font-medium  border-b  pb-1 cursor-pointer hover:scale-110 transition-all duration-300 hover:bg-client-light-red"
        onClick={() => {
          push('/user?page=orders'), onToggle()
        }}
      >
        {t('Your Orders')}
      </li>
      <li
        className=" font-medium  border-b  pb-1 cursor-pointer hover:scale-110 transition-all duration-300 hover:bg-client-light-red"
        onClick={() => {
          push('/user?page=checkout'), onToggle()
        }}
      >
        {t('Checkout')}
      </li>
      <li
        className=" font-medium  border-b  cursor-pointer hover:scale-110 transition-all duration-300 hover:bg-client-light-red"
        onClick={deleteUser}
      >
        {t('Log Out')}
      </li>
    </ul>
  )
}

export default HeaderUserList
