import { getRestuarantById } from '@/shared/services/restaurants'
import { Box, Text, useToast } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import { Product } from '@/shared/types/admin'
import { QUERY } from '@/shared/constants/query'
import { CLIENT } from '@/shared/constants/router'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { isAllProducts } from '@/shared/store/productsSlice/productsSlice'

function ClientRestaurantCard({ item, key }: { item: Product; key: number }) {
  const { push, query } = useRouter()
  const toast = useToast()
  const { t } = useTranslation('client')

  const { allProducts }: any = useSelector((state) => state)
  const dispatch = useDispatch()

  console.log(allProducts.value, 'allProducts')

  const { data: restaurant } = useQuery({
    queryFn: () => getRestuarantById(query.id as string),
    queryKey: [QUERY.RESTAURANTS, query.id],
  })

  return (
    <Box
      className="md:w-60 md:h-80 w-32 flex flex-col shadow-lg px-2 pt-3 pb-2.5 md:px-4 md:pt-4 md:pb-6 cursor-pointer hover:rounded-md bg-white hover:brightness-75 transition-all hover:scale-105 duration-500 "
      key={key}
      onClick={() => {
        {
          // dispatch(isAllProducts(false))
          push(CLIENT.RESTAURANTS + query?.id)
        }
      }}
    >
      {/* <Box className=" w-[174px] h-[160px] border border-2-black overflow-hidden m-auto"> */}
      <Image
        width={174}
        height={160}
        alt="card-iamge"
        src={item?.img_url}
        className="xs:pb-0 md:pb-3 object-fill md:w-[174px] md:h-[160px] border border-2-black overflow-hidden m-auto"
      />
      {/* </Box> */}
      <Text className="text-center md:text-start md:text-xl text-base font-medium md:font-bold overflow-hidden w-24 h-6 md:mb-1">
        {item?.name}
      </Text>
      <Box className="md:h-20 xs:h-14">
        <Text className="text-center md:text-start md:text-base xs:text-xs mb-5 text-admin-restaurant-card-category">
          {restaurant?.data?.result?.data?.cuisine}
        </Text>
      </Box>
      <Box className="flex md:flex-row flex-col justify-between align-middle flex-wrap md:gap-0 gap-1">
        <Text className="text-center text-xs md:text-base font-bold my-auto text-client-main-gray2">
          ${restaurant?.data?.result?.data?.delivery_price} {t('Delivery')}
        </Text>
        <Box className="text-center text-[10px] md:text-base bg-client-main-red rounded-3xl text-white px-1 py-0 md:px-3 md:py-1">
          {restaurant?.data?.result?.data?.delivery_min} {t('Min')}
        </Box>
      </Box>
    </Box>
  )
}

export default ClientRestaurantCard
