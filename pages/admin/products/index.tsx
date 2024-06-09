import React from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import Head from 'next/head'
import AdminProductsSide from '@/shared/components/admin/adminProductsSide/AdminProductsSide'
import AdminLayout from '@/shared/components/layout/adminLayout'

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
