//@ts-nocheck

import ClientHeader from '@/shared/components/clientHeader'
import {
  getRestuarantById,
  getRestuarants,
} from '@/shared/services/restaurants'
import { Box, Heading, Text } from '@chakra-ui/react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import { useTranslation } from 'react-i18next'

function RestaurantId() {
  const { t } = useTranslation()
  const { push, query, asPath } = useRouter()

  const { data: restaurant } = useQuery({
    queryFn: () => getRestuarantById(query.restaurant_id),
    queryKey: ['restuarant'],
  })

  console.log(restaurant, 'queryquery')
  console.log(query, 'query')

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
            <section className="">
              <Box>
                <Box className="w-full">
                  <Image
                    width={1400}
                    height={100}
                    alt="cover image"
                    src={restaurant?.data?.result?.data?.img_url}
                  />
                </Box>
                <Box className="flex px-8 border border-b-client-rest-grey py-5">
                  <Box className="flex flex-col justify-start w-3/5">
                    <Text className="text-2xl font-bold text">
                      {restaurant?.data?.result?.data?.name}
                    </Text>
                    <Text className="text-client-main-gray1 text-sm">
                      {restaurant?.data?.result?.data?.address}
                    </Text>
                  </Box>
                  <Box className="flex justify-start gap-7 w-2/5">
                    <Box className="text-client-main-gray1">
                      <Text className="text-lg">Cuisine</Text>
                      <Text className="text-sm">
                        {restaurant?.data?.result?.data?.cuisine}
                      </Text>
                    </Box>
                    <Box className="text-sm w-20 h-12 border border-client-main-red text-client-main-red rounded-md ">
                      ${restaurant?.data?.result?.data?.delivery_price} Delivery
                    </Box>
                    <Box
                      className="text-sm w-20 h-12 border bg-client-main-red text-white rounded-md cursor-pointer"
                      onClick={() => push('/restaurants')}
                    >
                      Go Back
                    </Box>
                  </Box>
                </Box>
                <Box className="flex justify-between py-12 px-12">
                  <Box className=" bg-client-fill-gray w-[846px]">
                    <Text className="text-2xl font-bold text-center py-10">
                      Products
                    </Text>
                    <Box>
                      {restaurant?.data?.result?.data?.products?.map(
                        (item: any, index: number) => {
                          return (
                            <Box
                              key={index}
                              className="flex justify-between align-middle gap-8 py-6 px-8 border-t border-t-client-rest-grey"
                            >
                              <Box className="flex gap-9">
                                <Image
                                  width={57}
                                  height={53}
                                  alt="cover image"
                                  src={item?.img_url}
                                />
                                <Box className="flex flex-col ">
                                  <Text className="text-lg my-auto">
                                    {item?.name}
                                  </Text>
                                  <Text className="text-client-rest-grey text-sm">
                                    {item?.description}
                                  </Text>
                                </Box>
                              </Box>
                              <Box className="flex gap-9 align-middle justify-center">
                                <Box className="flex gap-1.5 align-middle pt-2">
                                  <Text className="text-xs text-client-main-gray1 pt-1.5">
                                    From
                                  </Text>
                                  <Text>${item?.price}</Text>
                                </Box>
                                <Box>
                                  <Image
                                    width={40}
                                    height={40}
                                    alt="plus image"
                                    src={'/plus.svg'}
                                    className="cursor-pointer"
                                  />
                                </Box>
                              </Box>
                            </Box>
                          )
                        },
                      )}
                    </Box>
                  </Box>
                  {/* basket */}
                  <Box className="bg-client-fill-gray w-[400px] h-[548px] border border-dashed border-client-rest-grey relative">
                    <Box className="flex p-3 flex-col ">
                      <Box className="flex gap-1 align-middle">
                        <Image
                          width={25}
                          height={22}
                          alt="basket"
                          src={'/basket.svg'}
                          className="text-client-rest-grey"
                        />
                        <Text className="text-client-rest-grey">0 items</Text>
                      </Box>
                      <Box className="w-72 flex flex-col justify-center align-middle m-auto ">
                        <Image
                          width={200}
                          height={200}
                          alt="empty basket"
                          src={'/basketEmpty.svg'}
                          className="mx-auto"
                        />
                        <Text className="text-client-rest-grey1 text-4xl text-center">
                          Opps! Basket empty
                        </Text>
                      </Box>
                      <Box className="w-[372px] mx-auto h-12 bg-client-rest-grey1 rounded-full ps-6 pe-0.5 flex align-middle justify-between absolute bottom-6 left-3">
                        <Text className="text-white my-auto">Checkout</Text>
                        <Box className="text-client-rest-grey w-32 h-11 bg-white rounded-full my-auto text-center pt-3 ">
                          $0.00
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </section>
          </main>
          <footer></footer>
        </Box>
      </div>
    </div>
  )
}

export default RestaurantId

// export async function getStaticProps({ locale }: { locale: any }) {
//   return {
//     props: { ...(await serverSideTranslations(locale, ['admin'])) },
//   }
// }
