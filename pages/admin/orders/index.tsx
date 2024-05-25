import AdminAsideMenu from '@/shared/components/AdminAsideMenu'
import AdminAsideMenuResponsive from '@/shared/components/AdminAsideMenuResponsive'
import AdminHeader from '@/shared/components/AdminHeader'
import TableComponent from '@/shared/components/AdminTable'
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

import{
  ButtonGroup,IconButton
 
} from '@chakra-ui/react';
import { ViewIcon, DeleteIcon } from '@chakra-ui/icons';
function Orders() {
  const { t } = useTranslation('admin')
  const deliveryAddressWidth = "100px";
  return (
    <div>
      <Head>
        <title>Admin | {t('orders')}</title>
        <link rel="icon" href="/admin6024190.png" />
      </Head>

      <Box className="bg-admin-bg h-lvh">
        <Box className="max-w-[1440px] mx-auto">
          <AdminHeader />

          <Box className="flex gap-7">
            <AdminAsideMenu />
            <AdminAsideMenuResponsive />
            <Box className=" w-[1080px]   mt-5 ">

                <table   className="bg-white "  >
                  <thead className='h-[50px] border-b-2'>
                    <tr className='p-8'>
                      <th className='w-[100px] text-center'>ID</th>
                      <th className='w-[100px] text-center'>Customer ID</th>
                      <th className='w-[120px] text-center'>Time</th>
                      <th className='w-[200px] text-center'>Delivery Address</th>
                      <th className='w-[150px] text-center'>Amount</th>
                      <th className='w-[150px] text-center'>Payment Method</th>
                      <th className='w-[150px] text-center'>Contact</th>

                    </tr>
                  </thead>
                  <tbody >
                    <tr className='h-[60px] border-b-2 p-8'>
                      <td className='w-[100px] text-center'>
                        9177
                      </td>
                      <td className='w-[100px] text-center'>
                      022401
                      </td> <td className='w-[100px] text-center'>
                      25 Dec 2021
                      </td> <td  className='w-[200px] text-center'>
                      29 Eve Street,543 Evenue Road,Ny 87876 
                      </td> <td className='w-[100px] text-center'>
                      $249.7
                      </td> <td className='w-[100px] text-center'>
                      Cash On Delivery
                      </td>
                      <td className='w-[100px] text-center'>
                      994-51-410-3130
                      </td> <td className='w-[140px] text-center'>
                      <ButtonGroup>
                                        <IconButton
                                            colorScheme="teal"
                                            aria-label="Edit"
                                            icon={<ViewIcon />}
                                        />
                                        <IconButton
                                            colorScheme="red"
                                            aria-label="Delete"
                                            icon={<DeleteIcon />}
                                          
                                        />
                                    </ButtonGroup>
                      </td> 
                    </tr>
                    <tr className='h-[60px] border-b-2 p-8'>
                      <td className='w-[100px] text-center'>
                        9177
                      </td>
                      <td className='w-[100px] text-center'>
                      022401
                      </td> <td className='w-[100px] text-center'>
                      25 Dec 2021
                      </td> <td  className='w-[200px] text-center'>
                      29 Eve Street,543 Evenue Road,Ny 87876 
                      </td> <td className='w-[100px] text-center'>
                      $249.7
                      </td> <td className='w-[100px] text-center'>
                      Cash On Delivery
                      </td>
                      <td className='w-[100px] text-center'>
                      994-51-410-3130
                      </td> <td className='w-[140px] text-center'>
                      <ButtonGroup>
                                        <IconButton
                                            colorScheme="teal"
                                            aria-label="Edit"
                                            icon={<ViewIcon />}
                                        />
                                        <IconButton
                                            colorScheme="red"
                                            aria-label="Delete"
                                            icon={<DeleteIcon />}
                                          
                                        />
                                    </ButtonGroup>
                      </td> 
                    </tr>
                  </tbody>
                </table >
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  )
}

export default Orders

export async function getStaticProps({ locale }: { locale: any }) {
  return {
    props: { ...(await serverSideTranslations(locale, ['admin'])) },
  }
}
