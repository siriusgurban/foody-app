import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Toast, useToast } from '@chakra-ui/react'
import { CustomMutationOptions } from '../types/admin'

export function useCORP({
  queryFn,
  queryKey,
  toastText,
  toastStatus = 'success',
  onClickClose,
}: {
  queryFn: any
  queryKey: any
  toastText: string
  toastStatus?: string
  onClickClose?: any
}) {
  const queryClient = useQueryClient()
  const toast = useToast()

  const { mutate }: { mutate: any } = useMutation({
    mutationFn: (data: any) => queryFn(data),
    queryKey: [queryKey],
    onSuccess(data) {
      console.log(data, 'success')
      toast({
        title: toastText,
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      onClickClose()
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKey })
    },
  } as CustomMutationOptions)

  return { mutate }
}
