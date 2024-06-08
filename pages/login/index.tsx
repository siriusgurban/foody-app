import React from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import Head from 'next/head'
import ClientLoginNav from '@/shared/components/client/clientLoginNav'
import ClientLoginRegisterForm from '@/shared/components/client/clientLoginRegisterForm'
import { Box } from '@chakra-ui/react'

function Login() {
  const { t } = useTranslation('client')

  return (
    <>
      <Head>
        <title>Foody | {t('Login')}</title>
        <link rel="icon" href="/admin6024190.png" />
      </Head>
      <Box className="max-w-[1440px] mx-auto">
        <ClientLoginNav />
        <ClientLoginRegisterForm />
      </Box>
    </>
  )
}

export default Login

export async function getStaticProps({ locale }: { locale: any }) {
  return {
    props: { ...(await serverSideTranslations(locale, ['client'])) },
  }
}
