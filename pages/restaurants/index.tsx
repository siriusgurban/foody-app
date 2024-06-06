//@ts- nocheck

import ClientFooter from '@/shared/components/clientFooter'
import ClientHeader from '@/shared/components/clientHeader'
import ClientLayout from '@/shared/components/clientLayout'
import ClientRestaurantAsideMenu from '@/shared/components/clientRestaurantAsideMenu'
import ClientRestaurantCard from '@/shared/components/clientRestaurantCard'
import { QUERY } from '@/shared/constants/query'
import {
  getRestuarantById,
  getRestuarants,
} from '@/shared/services/restaurants'
import { Product, Restaurant } from '@/shared/types/admin'
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

function Restaurants() {
  const { t } = useTranslation()
  const { push, query, asPath } = useRouter()
  const isActive = (path: string) => (query.id === path ? '[#F0E1E1]' : 'none')
  const [size, setSize] = React.useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { data } = useQuery({
    queryFn: getRestuarants,
    queryKey: ['restuarants'],
  })

  const { data: restaurant } = useQuery({
    queryFn: () => getRestuarantById(query.id as string),
    queryKey: [QUERY.RESTAURANTS, query.id],
  })

  console.log(query?.id, 'queryquery')

  return (
    <div>
      <Head>
        <title>Foody | {t('restaurants')}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ClientLayout>
        <main className="flex md:mx-8 mx-0 md:gap-8 gap-0 md:justify-normal justify-center">
          <section className="md:block hidden">
            <Box className="w-64 h-lvh bg-client-fill-gray flex flex-col gap-7 max-h-[620px] scrollbar overflow-y-scroll pr-4 px-5 py-12  overflow-hidden">
              {data?.data?.result?.data?.map(
                (item: Restaurant, index: number) => {
                  return <ClientRestaurantAsideMenu key={index} item={item} />
                },
              )}
            </Box>
          </section>
          <section>
            <Drawer
              placement="bottom"
              onClose={onClose}
              isOpen={isOpen}
              size="lg"
            >
              <DrawerOverlay />
              <DrawerContent className="rounded-t-[20px]">
                <DrawerHeader>
                  <Box
                    className="flex justify-center cursor-pointer"
                    onClick={onClose}
                  >
                    <Image
                      src={'/closeIcon.svg'}
                      width={36}
                      height={36}
                      alt="close"
                    />
                  </Box>
                </DrawerHeader>
                <DrawerBody>
                  {data?.data?.result?.data?.map((item: any, index: number) => {
                    return (
                      <Box
                        className={`flex gap-4 cursor-pointer px-2  py-1 border-b-2 border-client-rest-grey w-full bg-${isActive(
                          item?.id,
                        )}`}
                        key={index}
                        onClick={() => {
                          push('?id=' + item?.id), onClose()
                        }}
                      >
                        <Text className={`text-lg font-medium text-black`}>
                          {item?.name}
                        </Text>
                      </Box>
                    )
                  })}
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </section>
          <section>
            <Box>
              <Box
                onClick={() => onOpen()}
                m={4}
                className="md:hidden flex gap-2 justify-center cursor-pointer shadow-lg py-2 min-w-64 "
              >
                <Image
                  src={'/filterIcon.svg'}
                  width={18}
                  height={12}
                  alt="filter"
                />
                <Text className="text-client-main-gray2 font-medium">
                  Filters
                </Text>
              </Box>
            </Box>

            <Box className="flex flex-wrap md:gap-7 gap-5 justify-center md:justify-start">
              {restaurant?.data?.result?.data?.products?.map(
                (item: Product, index: number) => {
                  return <ClientRestaurantCard key={index} item={item} />
                },
              )}
            </Box>
          </section>
        </main>
      </ClientLayout>
    </div>
  )
}

export default Restaurants

export async function getStaticProps({ locale }: { locale: any }) {
  return {
    props: { ...(await serverSideTranslations(locale, ['admin'])) },
  }
}
