import { QUERY } from '@/shared/constants/query'
import { ADMIN, CLIENT } from '@/shared/constants/router'
import { useRouter } from 'next/router'
import React from 'react'
import { useTranslation } from 'react-i18next'

const Navbar = () => {
  const { push, pathname } = useRouter()
  const { t } = useTranslation('client')

  return (
    <ul className=" gap-2 md:justify-around text-lg w-full md:w-1/2 text-client-main-gray1 font-medium hidden md:flex">
      <li
        onClick={() => push('/')}
        className={`cursor-pointer transition-all ${
          pathname === '/'
            ? 'text-client-main-red'
            : 'hover:text-client-main-red'
        }`}
      >
        {t('Home')}
      </li>
      <li
        onClick={() => push(CLIENT.RESTAURANTS)}
        className={`cursor-pointer transition-all ${
          pathname === '/restaurants'
            ? 'text-client-main-red'
            : 'hover:text-client-main-red'
        }`}
      >
        {t('Restaurants')}
      </li>
      <li
        onClick={() => push(CLIENT.ABOUTUS)}
        className={`cursor-pointer transition-all ${
          pathname === '/about-us'
            ? 'text-client-main-red'
            : 'hover:text-client-main-red'
        }`}
      >
        {t('About Us')}
      </li>
      <li
        onClick={() => push(CLIENT.HOWITWORKS)}
        className={`cursor-pointer transition-all ${
          pathname === '/how-it-works'
            ? 'text-client-main-red'
            : 'hover:text-client-main-red'
        }`}
      >
        {t('How It Works')}
      </li>
      <li
        onClick={() => push(CLIENT.FAQS)}
        className={`cursor-pointer transition-all ${
          pathname === '/faqs'
            ? 'text-client-main-red'
            : 'hover:text-client-main-red'
        }`}
      >
        {t('Faqs')}
      </li>
    </ul>
  )
}

export default Navbar
