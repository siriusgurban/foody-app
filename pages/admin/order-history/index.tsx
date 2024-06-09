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
import { motion } from 'framer-motion'

import AdminSecondaryComponent from '@/shared/components/admin/adminSecondaryComponent'
import { GetOrderHistory } from '@/shared/services/order'
import { ScrollBarContainer } from '@/shared/components/common/Scroll/scroll'
import { shortText } from '@/shared/helpers/shortText'
interface Order {
  id: string
  customer_id: string
  created: string
  delivery_address: string
  amount: number
  payment_method: number
  contact: string
  products: Array<{
    id: string
    img_url: string
    name: string
    price: number
    count: number
  }>
}

interface GetOrderHistoryResponse {
  result: {
    data: Order[]
  }
}

function OrderHistory() {
  const { t } = useTranslation('admin')
  const { data } = useQuery<GetOrderHistoryResponse>({
    queryFn: GetOrderHistory,
    queryKey: ['order-history'],
  })
  //console.log("history",data?.result?.data)
  const orderData = data?.result?.data

  return (
    <div>
      <Head>
        <title>Admin | {t('order-history')}</title>
        <link rel="icon" href="/admin6024190.png" />
      </Head>

      <Box className="bg-admin-bg h-lvh">
        <Box className="max-w-[1440px] mx-auto">
          <AdminHeader />
          <Box className="flex gap-7">
            <AdminAsideMenu />
            <AdminAsideMenuResponsive />
            <Box className=" w-[1080px]   mt-3 ">
              <div className="m-5">
                <AdminSecondaryComponent p={t('History')} visible={false} />
              </div>
              <ScrollBarContainer bg="#C74FEB">
                <motion.div
                  className="container"
                  initial={{ opacity: 0, y: -50, x: '-100%' }}
                  animate={{ opacity: 1, y: 0, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <table className="bg-white m-5">
                    <thead className="h-[50px] border-b-2">
                      <tr className="p-8">
                        <th className="w-[100px] text-center">ID</th>
                        <th className="w-[100px] text-center">Customer ID</th>
                        <th className="w-[120px] text-center">Time</th>
                        <th className="w-[200px] text-center">
                          Delivery Address
                        </th>
                        <th className="w-[150px] text-center">Amount</th>
                        <th className="w-[150px] text-center">
                          Payment Method
                        </th>
                        <th className="w-[150px] text-center">Contact</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderData?.map((order) => (
                        <motion.tr
                          key={order.id}
                          initial={{ opacity: 0, y: -10, x: 0 }}
                          animate={{ opacity: 1, y: 0, x: 0 }}
                          transition={{ duration: 0.5 }}
                          className="border-b text-center dark:border-neutral-500"
                        >
                          <motion.td className="font-medium py-4">
                            <span className="border-2 rounded-lg p-1">
                              {shortText(5, order.id)}
                            </span>
                          </motion.td>
                          <motion.td className="font-medium py-4">
                            <span className="border-2 rounded-lg p-1">
                              {shortText(5, order.customer_id)}
                            </span>
                          </motion.td>
                          <motion.td className="font-normal py-4">
                            {new Date(order.created).toLocaleDateString(
                              'en-US',
                              {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                              },
                            )}
                          </motion.td>
                          <motion.td className="whitespace-pre-line h-auto w-[10%] font-normal py-4">
                            {shortText(20, order.delivery_address)}
                          </motion.td>
                          <motion.td className="font-normal leading-5 py-4 tracking-wide">
                            {order.amount} $
                          </motion.td>
                          <motion.td className="font-normal leading-5 py-4 tracking-wide">
                            {order.payment_method === 0
                              ? 'cash'
                              : 'by credit card'}
                          </motion.td>
                          <motion.td className="font-normal leading-5 py-4 tracking-wide">
                            {order.contact}
                          </motion.td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </motion.div>
              </ScrollBarContainer>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  )
}

export default OrderHistory

export async function getStaticProps({ locale }: { locale: any }) {
  return {
    props: { ...(await serverSideTranslations(locale, ['admin'])) },
  }
}
