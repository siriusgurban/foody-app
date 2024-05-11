import React from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { Input } from '@chakra-ui/react'

function Login() {
  const { t } = useTranslation('admin')

  return (
    <div className="bg-admin-bg h-lvh">
      {t('login')}
      <Input />
      <Input />
    </div>
  )
}

export default Login

export async function getStaticProps({ locale }: { locale: any }) {
  return {
    props: { ...(await serverSideTranslations(locale, ['admin'])) },
  }
}
