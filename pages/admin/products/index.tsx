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

import AdminProductsSide from '@/shared/components/adminProductsSide/AdminProductsSide'
import AdminAsideMenuResponsive from '@/shared/components/AdminAsideMenuResponsive'
import AdminSecondaryComponent from '@/shared/components/adminSecondaryComponent'
import AdminLayout from '@/shared/components/adminLayout'

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

function Products() {
  const { t } = useTranslation('admin')

  return (
    <div>
      <Head>
        <title>Admin | {t('products')}</title>
        <link rel="icon" href="/admin6024190.png" />
      </Head>

      <AdminLayout>
        <AdminProductsSide />
      </AdminLayout>
    </div>
  )
}

export default Products

export async function getStaticProps({ locale }: { locale: any }) {
  return {
    props: { ...(await serverSideTranslations(locale, ['admin'])) },
  }
}
