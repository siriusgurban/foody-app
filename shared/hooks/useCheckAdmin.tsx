import React, { useEffect, useLayoutEffect, useState } from 'react'
import { getUser } from '../services/admin'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { ADMIN } from '../constants/router'
import { useToast } from '@chakra-ui/react'

export function useCheckAdmin(rout: string) {
  const { query, push } = useRouter()
  const [userInfo, setUserInfo] = useState()
  const toast = useToast()

  const { data, status, error } = useQuery({
    queryFn: getUser,
    queryKey: ['user'],
  })

  useLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      const userInfoString = localStorage.getItem('userInfo')
      if (userInfoString) {
        const parsedUserInfo = JSON.parse(userInfoString)
        setUserInfo(parsedUserInfo)
        console.log(parsedUserInfo, 'parsedUserInfo')
      }
    }
  }, []) // Empty dependency array ensures this effect runs only once after component mount

  useEffect(() => {
    console.log(userInfo, 'userInfo')
    console.log(data, 'data')
    if (userInfo !== undefined && data !== undefined) {
      return
      //   push(rout)
    } else {
      toast({
        description: 'Please, login first',
        status: 'warning',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      })
      push(ADMIN.LOGIN)
    }
  }, [userInfo])

  return {}
}
