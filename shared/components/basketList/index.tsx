//@ts- nocheck

import { Box, Text, useDisclosure, useToast } from '@chakra-ui/react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  getBasket,
  postBasket,
  deleteBasket,
  clearBasket,
} from '@/shared/services/basket'
import { AxiosResponse } from 'axios'
import { CustomMutationOptions, Product } from '@/shared/types/admin'

function BasketList() {
  const { t } = useTranslation()
  const { push, query } = useRouter()
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const queryClient = useQueryClient()

  const { data: basket } = useQuery({
    queryFn: () => getBasket(),
    queryKey: ['basket'],
  })

  const { mutate: clear } = useMutation({
    mutationFn: (data: any) => clearBasket(data),
    queryKey: ['basket'],
    onSuccess(data, variables, context) {
      console.log(data, 'success')
      toast({
        title: 'Item cleared',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['basket'] })
    },
  } as CustomMutationOptions)

  function handleBasketClear(id: string) {
    const newData: any = { basket_id: id }
    clear(newData)
  }

  const { mutate: delet } = useMutation({
    mutationFn: (data: any) => deleteBasket(data),
    queryKey: ['basket'],
    onSuccess(data, variables, context) {
      console.log(data, 'success')
      toast({
        title: 'Item deleted',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['basket'] })
    },
  } as CustomMutationOptions)

  function handleBasketDelete(id: string) {
    const newData: any = { product_id: id }
    delet(newData)
  }
  const { mutate: add } = useMutation({
    mutationFn: (data: any) => postBasket(data),
    queryKey: ['basket'],
    onSuccess(data, variables, context) {
      console.log(data, 'success')
      toast({
        title: 'Item added',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['basket'] })
    },
  } as CustomMutationOptions)

  function handleAddBasket(id: string) {
    console.log('added')
    const newData: any = { product_id: id }
    add(newData)
  }

  return (
    <Box className="overflow-y-auto">
      {basket?.data?.result?.data?.items.map((item: Product, index: number) => {
        return (
          <Box className="py-9 border-t-2" key={index}>
            <Box className="flex gap-2 align-middle relative">
              <Image
                width={21}
                height={17}
                alt="delete basket"
                src={'/basketDelete.svg'}
                className="absolute -top-4 right-1 cursor-pointer"
                onClick={() =>
                  handleBasketClear(basket?.data?.result?.data?.id)
                }
              />
              <Image
                width={45}
                height={45}
                src={`${item.img_url}`}
                alt="meal image"
                className="object-contain"
              />
              <Box className="flex flex-col gap-0.5 my-auto w-60">
                <Text>{item.name}</Text>
                <Text>${item.price}</Text>
              </Box>
              <Box className="flex flex-col bg-white rounded-lg h-16 w-7 justify-center text-center align-middle ">
                <Box
                  className="cursor-pointer"
                  onClick={() => handleAddBasket(item.id)}
                >
                  +
                </Box>
                <Box>{item.count}</Box>
                <Box
                  className="cursor-pointer"
                  onClick={() => handleBasketDelete(item.id)}
                >
                  --
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
