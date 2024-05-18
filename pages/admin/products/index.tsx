//@ts-nocheck

import React, { useEffect, useState } from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import {
  Box,
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
import Head from 'next/head'
import AdminHeader from '@/shared/components/AdminHeader'
import AdminAsideMenu from '@/shared/components/AdminAsideMenu'

import AdminProductsSide from '@/shared/components/AdminProductsSide'

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
    <div>
      <Head>
        <title>Admin | {t('Products')}</title>
        <link rel="icon" href="/icons8-admin-96.png" />
      </Head>

      <Box bg="#1E1E30">
        <Box className="max-w-[1440px] mx-auto">
          <AdminHeader />
          <Box display="flex" gap="28px">
            <AdminAsideMenu />
            <AdminProductsSide />
          </Box>
        </Box>
      </Box>
    </div>
  )
}

export default Login

export async function getStaticProps({ locale }: { locale: any }) {
  return {
    props: { ...(await serverSideTranslations(locale, ['admin'])) },
  }
}
