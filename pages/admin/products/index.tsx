//@ts-nocheck

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
import { getProducts, postProduct } from '../../../shared/services/products'

const newPost = {
  img_url:
    'https://firebasestorage.googleapis.com/v0/b/foodyapp-51b6e.appspot.com/o/product%2Fgeneral?alt=media&token=fc1915ed-481b-4f67-a018-7084e6df1aef',
  price: '17.99',
  name: 'Nanamin Tandoori 9',
  description: 'Avtosh 1 manat chicken marinated in a blend of Indian spices.',
  rest_id: 'WFf6YBK5VPuxEFZE9FAR',
}
const initialValues = {
  img_url: '',
  price: '',
  name: '',
  description: '',
  rest_id: '',
}

function Login() {
  const { t } = useTranslation('admin')
  const toast = useToast()
  const { push } = useRouter()

  const { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues,
    onSubmit: (values) => mutate(values),
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

  const { data: products } = useQuery({
    queryFn: getProducts,
    queryKey: ['products'],
  })

  console.log(products, 'products')

  return (
    <div className="bg-admin-bg h-lvh">
      {t('login')}
      <FormControl>
        <Input type="text" id="price" name="price" onChange={handleChange} />
        <Input type="text" id="name" name="name" onChange={handleChange} />
        <Input
          type="text"
          id="description"
          name="description"
          onChange={handleChange}
        />
        <Input
          type="text"
          id="rest_id"
          name="rest_id"
          onChange={handleChange}
        />
        <Input
          type="img_url"
          id="img_url"
          name="img_url"
          onChange={handleChange}
        />
        <Button
          variant="danger"
          type="submit"
          className="w-100"
          onClick={handleSubmit}
        >
          Sign In
        </Button>
      </FormControl>
    </div>
  )
}

export default Login

export async function getStaticProps({ locale }: { locale: any }) {
  return {
    props: { ...(await serverSideTranslations(locale, ['admin'])) },
  }
}
