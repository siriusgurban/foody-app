import { Box, Text } from '@chakra-ui/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'

function UserAsideMenu() {
  const { push, query } = useRouter()

  const isActive = (path: string) =>
    query.page === path ? 'client-pink' : 'none'
  const isActiveText = (path: string) =>
    query.page === path ? 'client-main-red' : 'client-main-gray1'

  function deleteUser() {
    localStorage.removeItem('userInfo')
    localStorage.removeItem('tokenObj')
  }

  return (
    <Box
      as="section"
      className="w-80 h-lvh bg-client-fill-gray flex flex-col gap-5 max-h-[620px] scrollbar overflow-y-scroll pr-4 px-10 pt-14 cursor-pointer overflow-hidden"
    >
      <Box
        className={`flex gap-4 px-4 py-3 w-60 cursor-pointer rounded-md hover:bg-client-pink bg-${isActive(
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
          Profile
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
          Your Basket
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
          Your Orders
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
          Your Checkout
        </Text>
      </Box>
      <Box
        className={`flex gap-4 px-4 py-3 w-60 cursor-pointer rounded-md hover:bg-client-pink bg-${isActive(
          'logout',
        )}`}
        onClick={() => push('/')}
      >
        <Image
          width={22}
          height={14}
          alt="profile"
          src={'/basketProfile.svg'}
        />
        <Text
          className={`text-xl font-semibold text-${isActiveText('logout')}  `}
          onClick={() => deleteUser()}
        >
          Logout
        </Text>
      </Box>
    </Box>
  )
}

export default UserAsideMenu
