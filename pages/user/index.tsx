//@ts- nocheck

import ClientFooter from '@/shared/components/clientFooter'
import ClientHeader from '@/shared/components/clientHeader'
import { ImageUpload } from '@/shared/components/imageUpload'
import UserAsideMenu from '@/shared/components/userAsideMenu'
import UserBasket from '@/shared/components/userBasket'
import UserCheckout from '@/shared/components/userCheckout'
import UserOrders from '@/shared/components/userOrders'
import UserProfile from '@/shared/components/userProfile'
import { Box, Text, useToast } from '@chakra-ui/react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useLayoutEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

function User() {
  const { t } = useTranslation()
  const { query, push } = useRouter()
  const toast = useToast()

  console.log(query?.page, 'queryquery')
  let rightComponent

  switch (query?.page) {
    case 'profile':
      rightComponent = <UserProfile />
      break
    case 'basket':
      rightComponent = <UserBasket />
      break
    case 'orders':
      rightComponent = <UserOrders />
      break
    case 'checkout':
      rightComponent = <UserCheckout />
      break
    default:
      rightComponent = <div>Choose one on the left menu</div>
  }

  useLayoutEffect(() => {
    function checkUser() {
      if (localStorage.getItem('tokenObj')) {
        push('/user')
      } else {
        toast({
          description: 'Please, login first',
          status: 'warning',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        })
        push('/login')
      }
    }
    checkUser()
  }, [])

  return (
    <div>
      <div>
        <Head>
          <title>Foody | {t('restaurants')}</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Box className="max-w-[1440px] mx-auto">
          <header>
            <ClientHeader />
          </header>
          <main className="flex mx-8 gap-10">
            <UserAsideMenu />
            <section>{rightComponent}</section>
          </main>
          <ClientFooter />
        </Box>
      </div>
    </div>
  )
}

export default User

export async function getStaticProps({ locale }: { locale: any }) {
  return {
    props: { ...(await serverSideTranslations(locale, ['admin'])) },
  }
}
