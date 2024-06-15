import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Toast, useToast } from '@chakra-ui/react'
import { CustomMutationOptions } from '../types/admin'

export function useBasket({
  queryFn,
  queryKey,
  toastText,
}: {
  queryFn: any
  queryKey: string
  toastText: string
}) {
  const queryClient = useQueryClient()
  const toast = useToast()

  const { mutate } = useMutation({
    mutationFn: (data: any) => queryFn(data),
    queryKey: [queryKey],
    onSuccess(data) {
      console.log(data, 'success')
      toast({
        title: toastText,
        status: 'success',
        duration: 500,
        isClosable: true,
      })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] })
    },
  } as CustomMutationOptions)

  function handle(id: string) {
    console.log('handled')
    let newData: any

    toastText == 'Basket cleared'
      ? (newData = { basket_id: id })
      : (newData = { product_id: id })

    mutate(newData)
  }
  return { handle }
}
