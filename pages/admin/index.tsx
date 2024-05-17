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
import DonutChart from '../../shared/components/chart'
import MountainLineChart from '../../shared/components/chart2'
import FastFoodSalesBarChart from '../../shared/components/chart3'

function AdminDashboard() {
  const { t } = useTranslation('admin')

  return (
    <div>
      <Head>
        <title>Admin | {t('dashboard')}</title>
        <link rel="icon" href="/admin6024190.png" />
      </Head>

      <Box className="bg-admin-bg h-lvh">
        <Box className="max-w-[1440px] mx-auto">
          <AdminHeader />
          <Box className="flex gap-3">
            <AdminAsideMenu />
            <AdminAsideMenuResponsive />

            <div className=" gap-4  mt-4 flex flex-wrap">
              <DonutChart />
              <MountainLineChart />
              <FastFoodSalesBarChart />
            </div>
          </Box>
        </Box>
      </Box>
    </div>
  )
}

export default AdminDashboard

export async function getStaticProps({ locale }: { locale: any }) {
  return {
    props: { ...(await serverSideTranslations(locale, ['admin'])) },
  }
}
