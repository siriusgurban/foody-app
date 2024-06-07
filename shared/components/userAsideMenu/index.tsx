import { Box, Text } from '@chakra-ui/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import { useTranslation } from 'react-i18next'

function UserAsideMenu() {
  const { push, query, reload } = useRouter()
  const { t } = useTranslation('client')

  const isActive = (path: string) => (query.page === path ? 'pink-200' : 'none')
  const isActiveText = (path: string) =>
    query.page === path ? 'client-main-red' : 'client-main-gray1'

  function deleteUser() {
    localStorage.removeItem('userInfo')
    setTimeout(() => {
      push('/')
    }, 1000)
    setTimeout(() => {
      reload()
    }, 1200)
  }

  return (
    <Box
      as="section"
      className="xl:min-w-80 lg:min-w-60 md:min-w-40 h-lvh bg-client-fill-gray xl:flex lg:flex md:hidden sm:hidden xs:hidden flex-col gap-5 max-h-[515px] scrollbar overflow-y-scroll pr-4 xl:px-10 lg:px-8 md:px-6 pt-14 cursor-pointer overflow-hidden"
    >
      <Box
        className={`flex gap-4 px-4 py-3 w-60 cursor-pointer rounded-md bg- hover:bg-client-pink bg- bg-${isActive(
          'profile',
        )}`}
        onClick={() => push('?page=' + 'profile')}
      >
        <Image
          width={22}
          height={14}
          alt="profile"
          src={`/profile.svg`}
          color="red"
        />
        <Text
          className={`text-xl font-semibold text-${isActiveText('profile')}  `}
        >
          {t('Profile')}
        </Text>
      </Box>
      <Box
        className={`flex gap-4 px-4 py-3 w-60 cursor-pointer rounded-md hover:bg-client-pink bg-${isActive(
          'basket',
        )}`}
        onClick={() => push('?page=' + 'basket')}
      >
        <Image
          width={22}
          height={14}
          alt="profile"
          src={'/basketProfile.svg'}
        />
        <Text
          className={`text-xl font-semibold text-${isActiveText('basket')}  `}
        >
          {t('Your Basket')}
        </Text>
      </Box>
      <Box
        className={`flex gap-4 px-4 py-3 w-60 cursor-pointer rounded-md hover:bg-client-pink bg-${isActive(
          'orders',
        )}`}
        onClick={() => push('?page=' + 'orders')}
      >
        <Image
          width={22}
          height={14}
          alt="profile"
          src={'/basketProfile.svg'}
        />
        <Text
          className={`text-xl font-semibold text-${isActiveText('orders')}  `}
        >
          {t('Your Orders')}
        </Text>
      </Box>
      <Box
        className={`flex gap-4 px-4 py-3 w-60 cursor-pointer rounded-md hover:bg-client-pink bg-${isActive(
          'checkout',
        )}`}
        onClick={() => push('?page=' + 'checkout')}
      >
        <Image
          width={22}
          height={14}
          alt="profile"
          src={'/basketProfile.svg'}
        />
        <Text
          className={`text-xl font-semibold text-${isActiveText('checkout')}  `}
        >
          {t('Your Checkout')}
        </Text>
      </Box>
      <Box
        className={`flex gap-4 px-4 py-3 w-60 cursor-pointer rounded-md hover:bg-client-pink bg-${isActive(
          'logout',
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
          className={`text-xl font-semibold text-${isActiveText('logout')}  `}
        >
          {t('Log Out')}
        </Text>
      </Box>
    </Box>
  )
}

export default UserAsideMenu
