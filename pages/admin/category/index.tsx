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
        <link rel="icon" href="/icons8-admin-96.png" />
      </Head>

      <Box className="bg-admin-bg h-lvh px-4">
        <Box className="max-w-[1280px] mx-auto">
          <Box className="flex justify-between align-middle bg-admin-secondary rounded-b-lg h-16  px-5">
            <Box className="flex gap-5 my-auto ">
              <Image
                src={'/hamburgerMenu.svg'}
                width={20}
                height={14}
                alt="hamburgerMenu"
                className="sx:hidden"
              />
              <Foody role="admin" />
            </Box>
            <Box className="flex gap-5 my-auto">
              <button className="rounded-full bg-admin-btn font-bold px-3 text-white text-xs">
                + <span className="xs:hidden sm:hidden">{t('addproduct')}</span>
              </button>
              <button>
                <Image
                  src={'/languages/en.svg'}
                  width={41}
                  height={41}
                  alt="en"
                />
              </button>
              <button>
                {' '}
                <Image
                  src={'/adminLogo.svg'}
                  width={41}
                  height={41}
                  alt="adminLogo"
                />
              </button>
            </Box>
          </Box>
          <Box className="bg-admin-btn ">
            <Box onClick={() => push('/admin')}>Dashboard</Box>
            <Box onClick={() => push('/admin/products')}>Products</Box>
            <Box onClick={() => push('/admin/restaurants')}>Restuarants</Box>
            <Box>Category</Box>
            <Box>Orders</Box>
            <Box>Offers</Box>
            <Box>LogOut</Box>
          </Box>
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
