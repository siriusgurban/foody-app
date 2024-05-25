import { Restaurant } from '@/shared/types/admin'
import { Box, Text } from '@chakra-ui/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'

function ClientRestaurantAsideMenu({
  item,
  key,
}: {
  item: Restaurant
  key: number
}) {
  const { push, query } = useRouter()
  const isActive = (path: string) =>
    query.id === path ? 'client-light-red' : 'none'
  const isActiveText = (path: string) =>
    query.id === path ? 'client-main-red' : 'client-main-gray1'

  return (
    <Box
      className={`flex gap-4 cursor-pointer px-2 py-1.5 bg-${isActive(
        item?.id,
      )}`}
      key={key}
      onClick={() => push('?id=' + item?.id)}
    >
      <Image
        width={25}
        height={28}
        alt={item?.name}
        src={item?.img_url}
        className="rounded-md "
      />

      <Text className={`text-xl font-semibold text-${isActiveText(item?.id)}`}>
        {item?.name}
      </Text>
    </Box>
  )
}

export default ClientRestaurantAsideMenu
