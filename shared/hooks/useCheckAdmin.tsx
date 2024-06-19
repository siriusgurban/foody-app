import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { ADMIN } from '../constants/router'
import { useToast } from '@chakra-ui/react'
import { getUser } from '../services/admin'

export function useCheckAdmin() {
  const { push } = useRouter()
  const toast = useToast()

  const { data, status } = useQuery({
    queryFn: getUser,
    queryKey: ['user'],
  })

  useEffect(() => {
    const userInfoString = localStorage.getItem('userInfo')
    if (userInfoString == undefined && data == undefined) {
      toast({
        description: 'Please log in first',
        status: 'warning',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      })
      push(ADMIN.LOGIN)
    }
  }, [])

  return {}
}
