import React from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import Head from 'next/head'
import ClientLoginNav from '@/shared/components/clientLoginNav'
import ClientLoginRegisterForm from '@/shared/components/clientLoginRegisterForm'

function Login() {
  const { t } = useTranslation('admin')

  return (
    <>
      <Head>
        <title>Foody | {t('login')}</title>
        <link rel="icon" href="/admin6024190.png" />
      </Head>
      <ClientLoginNav />
      <ClientLoginRegisterForm />
    </>
  )
}

export default Login

export async function getStaticProps({ locale }: { locale: any }) {
  return {
    props: { ...(await serverSideTranslations(locale, ['client'])) },
  }
}
