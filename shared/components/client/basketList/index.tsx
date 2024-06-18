import { Box, Text, useDisclosure, useToast } from '@chakra-ui/react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  getBasket,
  postBasket,
  deleteBasket,
  clearBasket,
} from '@/shared/services/basket'
import { CustomMutationOptions, Product } from '@/shared/types/admin'
import { useBasket } from '@/shared/hooks/useBasket'
import { QUERY } from '@/shared/constants/query'
import { FiMinus } from 'react-icons/fi'
import { IoIosAdd } from 'react-icons/io'

function BasketList() {
  const { t } = useTranslation('client')

  const { data: basket } = useQuery({
    queryFn: () => getBasket(),
    queryKey: [QUERY.BASKET],
  })

  const { handle: handleAddBasket } = useBasket({
    queryFn: postBasket,
    queryKey: QUERY.BASKET,
    toastText: 'Item added',
  })

  const { handle: handleBasketDelete } = useBasket({
    queryFn: deleteBasket,
    queryKey: QUERY.BASKET,
    toastText: 'Item deleted',
  })
  const { handle: handleBasketClear } = useBasket({
    queryFn: clearBasket,
    queryKey: QUERY.BASKET,
    toastText: 'Basket cleared',
  })

  return (
    <Box className="">
      {basket?.data?.result?.data?.items.map((item: Product, index: number) => {
        return (
          <Box
            className="xl:py-7 lg:py-7 md:py-6 sm:py-5 xs:py-4 border-t-2"
            key={index}
          >
            <Box className="flex justify-between  align-middle relative pe-8">
              <Image
                width={21}
                height={17}
                alt="delete basket"
                src={'/basketDelete.svg'}
                className="absolute xl:-top-4 xl:left-[324px] lg:-top-4 lg:left-[324px] md:-top-2 md:left-1 sm:-top-2 sm:left-1 xs:-top-2 xs:left-1 cursor-pointer"
                onClick={() =>
                  handleBasketClear(basket?.data?.result?.data?.id)
                }
              />
              <Box className="flex justify-between gap-2.5">
                <Image
                  width={45}
                  height={45}
                  src={`${item.img_url}`}
                  alt="meal image"
                  className="object-contain"
                />
                <Box className="flex flex-col gap-0.5 my-auto w-56 ">
                  <Text className="xs:text-sm lg:text-base">{item.name}</Text>
                  <Text className="xs:text-xs lg:text-sm">${item.price}</Text>
                </Box>
              </Box>

              <Box className="flex flex-col xl:bg-white lg:bg-white md:bg-client-fill-gray sm:bg-client-fill-gray xs:bg-client-fill-gray rounded-full h-16 w-7 justify-center text-center align-middle ">
                <button
                  disabled={(item?.count as number) >= 10 ? true : false}
                  className="cursor-pointer"
                  onClick={() => handleAddBasket(item.id)}
                >
                  <IoIosAdd className=" w-7" />
                </button>
                <Box>{item.count}</Box>
                <Box
                  className="cursor-pointer"
                  onClick={() => handleBasketDelete(item.id)}
                >
                  <FiMinus className=" w-7" />
                </Box>
              </Box>
            </Box>
          </Box>
        )
      })}
    </Box>
  )
}

export default BasketList
