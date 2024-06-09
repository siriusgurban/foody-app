import AdminAsideMenu from '@/shared/components/admin/AdminAsideMenu'
import AdminAsideMenuResponsive from '@/shared/components/admin/AdminAsideMenuResponsive'
import AdminHeader from '@/shared/components/admin/AdminHeader'
import Foody from '@/shared/components/common/foody'
import { getCategories, getCategoryById } from '@/shared/services/category'
import { Box, Button, useToast } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import DonutChart from '../../shared/components/admin/chart'
import MountainLineChart from '../../shared/components/admin/chart2'
import FastFoodSalesBarChart from '../../shared/components/admin/chart3'
import AdminLayout from '@/shared/components/layout/adminLayout'

function AdminDashboard() {
  const { t } = useTranslation('admin')

  return (
    <div>
      <Head>
        <title>Admin | {t('dashboard')}</title>
        <link rel="icon" href="/admin6024190.png" />
      </Head>

      <AdminLayout>
        <div className=" gap-7   mt-4 flex flex-col max-h-[620px] scrollbar overflow-y-scroll pr-4">
          <div className="flex gap-8  flex-wrap">
            <DonutChart />
            <MountainLineChart />
          </div>
          <div className="flex gap-8 flex-wrap">
            <FastFoodSalesBarChart />
            <FastFoodSalesBarChart />
          </div>
        </div>
      </AdminLayout>
    </div>
  )
}

export default AdminDashboard

export async function getStaticProps({ locale }: { locale: any }) {
  return {
    props: { ...(await serverSideTranslations(locale, ['admin'])) },
  }
}
