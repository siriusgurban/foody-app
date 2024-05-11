//@ts- nocheck

import React, { useEffect, useState } from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import {
  Button,
  FormControl,
  FormHelperText,
  Input,
  useToast,
} from '@chakra-ui/react'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { postProduct } from '../../../shared/services/products'
import { getBasket } from '@/shared/services/basket'

const newPost = {
  product_id: '36p9gVeJhCanknlwEnKR',
}

function Basket() {
  const { t } = useTranslation('admin')
  const toast = useToast()
  const { push } = useRouter()

  const query = useQuery({
    queryKey: ['basket'],
    queryFn: getBasket,
  })
  const { mutate } = useMutation({
    mutationFn: postProduct,
    onSuccess(data, variables, context) {
      console.log(data, 'success')
      toast({
        title: 'Account created.',
        description: "We've created your account for you.",
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    },
    onError(data, variables, context) {
      console.log(data, 'error')
    },
  })

  function handleForm() {
    // const response = postAuth(data)
    const response = mutate(newPost)
    // push('/admin')
    console.log('form handled', response)
    return response
  }

  function handleGetBasket() {
    return query.data
  }

  return (
    <div>
      <button onClick={handleForm}>Add Basket</button>
      <button onClick={handleGetBasket}>Get Basket</button>
    </div>
  )
}

export default Basket
