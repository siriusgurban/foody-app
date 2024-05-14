import AdminAsideMenu from '@/shared/components/AdminAsideMenu'
import AdminAsideMenuResponsive from '@/shared/components/AdminAsideMenuResponsive'
import AdminHeader from '@/shared/components/AdminHeader'
import Foody from '@/shared/components/foody'
import { getCategories, getCategoryById } from '@/shared/services/category'
import { Box, Button, useToast } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

function Category() {
  const { t } = useTranslation('admin')
  const toast = useToast()
  const { push } = useRouter()

  const { data: categories } = useQuery({
    queryFn: getCategories,
    queryKey: ['categories'],
  })

  const idid = 'Pe7DYPji0FqEWGAC9yyK'

  const { data: category } = useQuery({
    queryFn: () => getCategoryById(idid),
    queryKey: ['category'],
  })

  console.log(category, 'cate')

  return (
    <div>
      <Head>
        <title>Admin | {t('category')}</title>
        <link rel="icon" href="/admin6024190.png" />
      </Head>

      <Box className="bg-admin-bg h-lvh">
        <Box className="max-w-[1440px] mx-auto">
          <AdminHeader />
          <AdminAsideMenu />
          <AdminAsideMenuResponsive />
        </Box>
      </Box>
    </div>
  )
}

export default Category

export async function getStaticProps({ locale }: { locale: any }) {
  return {
    props: { ...(await serverSideTranslations(locale, ['admin'])) },
  }
}
