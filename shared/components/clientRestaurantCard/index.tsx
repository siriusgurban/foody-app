import { getRestuarantById } from '@/shared/services/restaurants'
import { Box, Text } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import { Product } from '@/shared/types/admin'

function ClientRestaurantCard({ item, key }: { item: Product; key: number }) {
  const { push, query } = useRouter()

  const { data: restaurant } = useQuery({
    queryFn: () => getRestuarantById(query.id as string),
    queryKey: ['restuarant', query.id],
  })

  return (
    <Box
      className="md:w-60 w-32 flex flex-col shadow-lg px-2 pt-3 pb-2.5 md:px-4 md:pt-3 md:pb-6 cursor-pointer"
      key={key}
      onClick={() => {
        push('/restaurants/' + query.id)
      }}
    >
      <Box className="md:w-44 md:h-40 w-20 h-20 mx-auto ">
        <Image
          width={174}
          height={160}
          alt="card-iamge"
          src={item?.img_url}
          className="md:mb-0 mb-1 object-contain "
        />
      </Box>
      <Text className="text-center md:text-start md:text-xl text-base font-medium md:font-bold overflow-hidden w-24 h-6 md:mb-1">
        {item?.name}
      </Text>
      <Box className="h-20">
        <Text className="text-center md:text-start md:text-xl text-base mb-5 text-admin-restaurant-card-category">
          {restaurant?.data?.result?.data?.cuisine}
        </Text>
      </Box>
      <Box className="flex md:flex-row flex-col justify-between align-middle flex-wrap md:gap-0 gap-1">
        <Text className="text-center text-xs md:text-base font-bold my-auto">
          ${restaurant?.data?.result?.data?.delivery_price} Delivery
        </Text>
        <Box className="text-center text-[10px] md:text-base bg-client-main-red rounded-3xl text-white px-1 py-0 md:px-3 md:py-1">
          {restaurant?.data?.result?.data?.delivery_min} Min
        </Box>
      </Box>
    </Box>
  )
}

export default ClientRestaurantCard
