import { CLIENT } from '@/shared/constants/router'
import { isActive } from '@/shared/utils/isActive'
import { Box, Text } from '@chakra-ui/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import { useTranslation } from 'react-i18next'

function UserAsideMenu() {
  const { push, query, reload } = useRouter()
  const { t } = useTranslation('client')

  function deleteUser() {
    localStorage.removeItem('userInfo')
    setTimeout(() => {
      push(CLIENT.HOME)
    }, 1000)
    setTimeout(() => {
      reload()
    }, 1200)
  }

  return (
    <Box
      as="section"
      className="xl:min-w-80 lg:min-w-60 md:min-w-40 h-lvh bg-client-fill-gray xl:flex lg:flex md:hidden sm:hidden xs:hidden flex-col gap-5 max-h-[515px] scrollbar overflow-y-scroll pr-4 xl:px-10 lg:px-6 md:px-6 pt-14 cursor-pointer overflow-hidden"
    >
      <Box
        className={`flex gap-4 xl:px-4 px-2 py-3 max-w-60 cursor-pointer rounded-md hover:scale-110 transition-all duration-500 hover:bg-client-rest-purple ${
          query.page == 'profile' ? 'bg-pink-200' : ''
        }`}
        onClick={() => push('?page=' + 'profile')}
      >
        <Image
          width={22}
          height={14}
          alt="profile"
          src={`${isActive(
            query,
            'profile',
            '/profileRed.svg',
            '/profile.svg',
          )}`}
          color="red"
        />
        <Text
          className={`xl:text-xl text-lg font-semibold text-${isActive(
            query,
            'profile',
            'client-main-red',
            'client-main-gray1',
          )}`}
        >
          {t('Profile')}
        </Text>
      </Box>
      <Box
        className={`flex gap-4 xl:px-4 px-2 py-3 max-w-60 cursor-pointer rounded-md hover:scale-110 transition-all duration-500 hover:bg-client-rest-purple bg-${isActive(
          query,
          'basket',
          'pink-200',
          'none',
        )}`}
        onClick={() => push('?page=' + 'basket')}
      >
        <Image
          width={22}
          height={14}
          alt="profile"
          src={`${isActive(
            query,
            'basket',
            '/basketRed.svg',
            '/basketProfile.svg',
          )}`}
        />
        <Text
          className={`xl:text-xl text-lg font-semibold text-${isActive(
            query,
            'basket',
            'client-main-red',
            'client-main-gray1',
          )}`}
        >
          {t('Your Basket')}
        </Text>
      </Box>
      <Box
        className={`flex gap-4 xl:px-4 px-2 py-3 max-w-60 cursor-pointer rounded-md hover:scale-110 transition-all duration-500 hover:bg-client-rest-purple bg-${isActive(
          query,
          'orders',
          'pink-200',
          'none',
        )}`}
        onClick={() => push('?page=' + 'orders')}
      >
        <Image
          width={22}
          height={14}
          alt="profile"
          src={`${
            query.page === 'orders' ? '/basketRed.svg' : '/basketProfile.svg'
          }`}
        />
        <Text
          className={`xl:text-xl text-lg font-semibold text-${isActive(
            query,
            'orders',
            'client-main-red',
            'client-main-gray1',
          )}`}
        >
          {t('Your Orders')}
        </Text>
      </Box>
      <Box
        className={`flex gap-4 xl:px-4 px-2 py-3 max-w-60 cursor-pointer rounded-md hover:scale-110 transition-all duration-500 hover:bg-client-rest-purple bg-${isActive(
          query,
          'checkout',
          'pink-200',
          'none',
        )}`}
        onClick={() => push('?page=' + 'checkout')}
      >
        <Image
          width={22}
          height={14}
          alt="profile"
          src={`${isActive(
            query,
            'checkout',
            '/basketRed.svg',
            '/basketProfile.svg',
          )}`}
        />
        <Text
          className={`xl:text-xl text-lg font-semibold text-${isActive(
            query,
            'checkout',
            'client-main-red',
            'client-main-gray1',
          )}`}
        >
          {t('Your Checkout')}
        </Text>
      </Box>
      <Box
        className={`flex gap-4 xl:px-4 px-2 py-3 max-w-60 cursor-pointer rounded-md hover:scale-110 transition-all duration-500 hover:bg-client-rest-purple bg-${isActive(
          query,
          'logout',
          'client-pink',
          'none',
        )}`}
        onClick={deleteUser}
      >
        <Image
          width={22}
          height={14}
          alt="profile"
          src={'/basketProfile.svg'}
        />
        <Text
          className={`xl:text-xl text-lg font-semibold text-${isActive(
            query,
            'logout',
            'client-main-red',
            'client-main-gray1',
          )}`}
        >
          {t('Log Out')}
        </Text>
      </Box>
    </Box>
  )
}

export default UserAsideMenu
