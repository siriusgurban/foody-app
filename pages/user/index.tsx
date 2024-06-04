import ClientFooter from '@/shared/components/clientFooter'
import ClientHeader from '@/shared/components/clientHeader'
import UserAsideMenu from '@/shared/components/userAsideMenu'
import UserBasket from '@/shared/components/userBasket'
import UserCheckout from '@/shared/components/userCheckout'
import UserOrders from '@/shared/components/userOrders'
import UserProfile from '@/shared/components/userProfile'
import { getUser } from '@/shared/services/admin'
import { Box, Text, useToast } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

function User() {
  const { t } = useTranslation('client')
  const { query, push, reload } = useRouter()
  const toast = useToast()
  const [userInfo, setUserInfo] = useState({})

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
      }
    }
  }, []) // Empty dependency array ensures this effect runs only once after component mount

  useEffect(() => {
    if (userInfo !== undefined && data !== undefined) {
      push('/user?page=' + query?.page)
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

    // return reload()
  }, [])

  {
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
              {rightComponent}
            </main>
            <ClientFooter />
          </Box>
        </div>
      </div>
    )
  }
}

export default User

export async function getStaticProps({ locale }: { locale: any }) {
  return {
    props: { ...(await serverSideTranslations(locale, ['client'])) },
  }
}
