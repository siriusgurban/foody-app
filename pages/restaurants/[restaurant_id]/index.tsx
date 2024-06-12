import BasketEmpty from '@/shared/components/client/basketEmpty'
import BasketList from '@/shared/components/client/basketList'
import { getBasket, postBasket } from '@/shared/services/basket'
import { CustomMutationOptions } from '@/shared/types/admin'
import { getRestuarantById } from '@/shared/services/restaurants'
import { Product } from '@/shared/types/admin'
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ClientLayout from '@/shared/components/layout/clientLayout'
import SkeletonCover from '@/shared/components/common/skeleton/SkeletonCover'
import { QUERY } from '@/shared/constants/query'
import { CLIENT } from '@/shared/constants/router'
import { useBasket } from '@/shared/hooks/useBasket'
import { getUser } from '@/shared/services/admin'

function RestaurantId() {
  const { t } = useTranslation('client')
  const { push, query } = useRouter()
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [userInfo, setUserInfo] = useState({})

  const { data: basket } = useQuery({
    queryFn: () => getBasket(),
    queryKey: [QUERY.BASKET],
  })

  console.log(basket, 'basket')

  const { data: restaurant } = useQuery({
    queryFn: () => getRestuarantById(query.restaurant_id as string),
    queryKey: [QUERY.RESTAURANTS, query.restaurant_id],
  })

  const [inBasket, setInBasket] = useState(true)

  console.log(restaurant?.data?.result?.data?.products, 'restaurant.products')

  // function handleBasketFilter(id) {
  //   let newBasket = basket?.data?.result?.data?.items.includes(
  //     (item) => item?.id === id,
  //   )
  //   console.log(newBasket, 'newBasketnewBasketnewBasket')
  //   setInBasket(newBasket)
  // }

  const { data, status, error } = useQuery({
    queryFn: getUser,
    queryKey: [QUERY.USER],
  })

  useLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      const userInfoString = localStorage.getItem('userInfo')
      if (userInfoString) {
        const parsedUserInfo = JSON.parse(userInfoString)
        setUserInfo(parsedUserInfo)
      }
    }
  }, []) // Empty dependency array ensures this effect runs only once after component mount

  function checkUser() {
    if (userInfo !== undefined && data !== undefined) {
      push('/user?page=checkout')
    } else {
      toast({
        description: 'Please, login first',
        status: 'warning',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      })
    }
  }
  const { handle: handleAddBasket } = useBasket({
    queryFn: postBasket,
    queryKey: QUERY.BASKET,
    toastText: 'Item added',
  })

  function basketVerify(id: string) {
    if (userInfo !== undefined && data !== undefined) {
      return handleAddBasket(id)
    }
    return toast({
      description: 'Please, login first',
      status: 'warning',
      duration: 3000,
      isClosable: true,
      position: 'top-right',
    })
  }

  return (
    <div>
      <div>
        <Head>
          <title>Foody | {t('restaurants')}</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <ClientLayout>
          <main className="flex xl:mx-8 md:mx-6 xs:mx-3 xl:gap-10 lg:gap-0 md:gap-0 xs:gap-0 justify-center">
            <section className="">
              <Box className="max-w-[1373px]">
                <Box className="xs:w-72 md:w-2/3 xl:w-full xs:h-40 xl:h-[448px] overflow-hidden object-cover mx-auto">
                  {restaurant?.data?.result?.data?.img_url ? (
                    <Image
                      width={1400}
                      height={448}
                      alt="coverimage"
                      src={restaurant?.data?.result?.data?.img_url}
                      className="bg-cover"
                    />
                  ) : (
                    <SkeletonCover />
                  )}
                </Box>

                <Box className="w-full flex xl:flex-row lg:flex-row md:flex-col xs:flex-col xl:px-8 md:px-4 xs:px-2 border-b border-b-client-rest-grey py-5">
                  <Box className="flex flex-col justify-start md:w-full w-3/5">
                    <Text className="xs:text-base md:text-xl xl:text-2xl font-bold text">
                      {restaurant?.data?.result?.data?.name}
                    </Text>
                    <Text className="text-client-main-gray1 xs:text-xs md:text-sm xl:text-sm ">
                      {restaurant?.data?.result?.data?.address}
                    </Text>
                  </Box>
                  <Box className="flex justify-between gap-7 w-2/5 md:w-full">
                    <Box className="">
                      <Text className=" xs:text-xs md:text-base xl:text-lg text-client-main-gray1">
                        {t('Cuisine')}
                      </Text>
                      <Text className="xs:text-xs md:text-sm xl:text-sm text-text-client-main-gray2">
                        {restaurant?.data?.result?.data?.cuisine}
                      </Text>
                    </Box>
                    <Box className="flex justify-between gap-7">
                      <Box className="xs:text-xs md:text-sm xl:text-sm  w-20 h-12 border border-client-main-red text-client-main-red rounded-md py-1 px-2">
                        ${restaurant?.data?.result?.data?.delivery_price}{' '}
                        {t('Delivery')}
                      </Box>
                      <Box
                        className="xs:hidden md:flex xl:flex xs:text-xs md:text-sm xl:text-sm  w-20 h-12 border bg-client-main-red text-white rounded-md cursor-pointer  justify-center pt-3"
                        onClick={() => push(CLIENT.HOME)}
                      >
                        {t('Go Back')}
                      </Box>
                    </Box>
                  </Box>
                </Box>

                <Box className="flex justify-center xl:gap-12 lg:gap-10 md:gap-0 sm:gap-0  xs:gap-0 xl:py-12 xl:px-4 md:py-8 md:px-6 xs:py-4 xs:px-0">
                  <Box className=" bg-client-fill-gray max-w-[846px] w-full max-h-[960px]">
                    <Text className="xs:text-lg md:text-xl xl:text-2xl font-bold text-center xl:py-10 md:py-7 xs:py-4">
                      {t('Products')}
                    </Text>
                    <Box className="w-full">
                      {restaurant?.data?.result?.data?.products?.map(
                        (item: Product, index: number) => {
                          return (
                            <Box
                              key={index}
                              className="flex justify-between align-middle xl:gap-8 md:gap-4 xs:gap-2 xl:py-6 md:py-3 xs:py-1 xl:px-8 md:px-4 xs:px-2 border-t border-t-client-rest-grey "
                            >
                              <Box className="flex xl:gap-9 md:gap-7 xs:gap-5">
                                <Image
                                  width={57}
                                  height={53}
                                  alt="cover image"
                                  src={item?.img_url}
                                  className="xl:block
                                  lg:block md:hidden xs:hidden"
                                />
                                <Box className="flex flex-col ">
                                  <Text className="xs:text-sm md:text-base xl:text-lg my-auto">
                                    {item?.name}
                                  </Text>
                                  <Text className="text-client-rest-grey xs:text-xs md:text-sm xl:text-sm">
                                    {item?.description}
                                  </Text>
                                </Box>
                              </Box>
                              <Box className="flex xl:gap-9 md:gap-7 xs:gap-3 align-middle justify-center">
                                <Box className="flex gap-1.5 align-middle">
                                  <Text className="text-xs text-client-main-gray1 my-auto xs:hidden md:hidden xl:block">
                                    From
                                  </Text>
                                  <Text className=" xs:text-sm md:text-sm xl:text-base my-auto">
                                    ${item?.price}
                                  </Text>
                                </Box>
                                <Box
                                  onClick={() => basketVerify(item?.id)}
                                  className="xl:w-10 md:w-8 xs:w-5 my-auto"
                                >
                                  <Image
                                    width={40}
                                    height={40}
                                    alt="plus image"
                                    src={`${
                                      inBasket ? '/plusgreen.svg' : '/plus.svg'
                                    }`}
                                    className="cursor-pointer"
                                  />
                                </Box>
                              </Box>
                            </Box>
                          )
                        },
                      )}

                      <Box
                        onClick={() => onOpen()}
                        className={`xl:hidden lg:hidden md:flex sm:flex xs:flex bg-${
                          basket?.data?.result?.data?.items.length == 0 ||
                          basket?.data?.result?.data?.items.length == undefined
                            ? 'client-rest-grey1'
                            : 'client-main-red'
                        } max-w-[372px] mx-auto h-9 rounded-full ps-6 pe-0.5 flex  justify-between  cursor-pointer `}
                      >
                        <Box className="flex gap-1.5 py-auto">
                          <Image
                            width={19}
                            height={17}
                            alt="basket"
                            src={`${
                              basket?.data?.result?.data?.total_item == 0 ||
                              basket?.data?.result?.data?.total_item ==
                                undefined
                                ? '/basketRed.svg'
                                : '/basket.svg'
                            }`}
                            className="text-client-rest-grey"
                          />
                          <Text
                            className={`text-${
                              basket?.data?.result?.data?.total_item == 0 ||
                              basket?.data?.result?.data?.total_item ==
                                undefined
                                ? 'client-rest-grey'
                                : 'white'
                            } font-bold pt-2 text-sm`}
                          >
                            {basket?.data?.result?.data?.total_item} items
                          </Text>
                        </Box>
                        <Box
                          className={`text-${
                            basket?.data?.result?.data?.items.length == 0 ||
                            basket?.data?.result?.data?.items.length ==
                              undefined
                              ? 'client-rest-grey'
                              : 'client-main-red'
                          } px-5 h-8 bg-white rounded-full my-auto text-center pt-1.5`}
                        >
                          $
                          {basket?.data?.result?.data?.total_amount
                            ? basket?.data?.result?.data?.total_amount
                            : '0.00'}
                        </Box>
                      </Box>
                    </Box>
                  </Box>

                  {/* basket */}
                  <Box
                    as="section"
                    className="p-2 bg-client-fill-gray w-full max-w-[400px] h-[548px]  border border-dashed border-client-rest-grey relative xl:block lg:block md:hidden xs:hidden"
                  >
                    <Box className="flex p-3 flex-col ">
                      <Box className="flex gap-1.5 pb-4">
                        <Image
                          width={25}
                          height={22}
                          alt="basket"
                          src={`${
                            basket?.data?.result?.data?.total_item == 0 ||
                            basket?.data?.result?.data?.total_item == undefined
                              ? '/basket.svg'
                              : '/basketRed.svg'
                          }`}
                          className="text-client-rest-grey"
                        />
                        <Text
                          className={`text-${
                            basket?.data?.result?.data?.total_item == 0 ||
                            basket?.data?.result?.data?.total_item == undefined
                              ? 'client-rest-grey'
                              : 'client-main-red'
                          } font-bold`}
                        >
                          {basket?.data?.result?.data?.total_item} items
                        </Text>
                      </Box>

                      <Box className="overflow-y-auto scrollbarClient h-[400px] ">
                        {basket?.data?.result?.data?.total_item == 0 ||
                        basket?.data?.result?.data?.total_item == undefined ? (
                          <BasketEmpty />
                        ) : (
                          <BasketList />
                        )}
                      </Box>

                      {/* checkout */}
                      <Box
                        as="button"
                        disabled={
                          basket?.data?.result?.data?.total_item == 0
                            ? true
                            : false
                        }
                        onClick={() => checkUser()}
                        className={` bg-${
                          basket?.data?.result?.data?.total_item == 0 ||
                          basket?.data?.result?.data?.total_item == undefined
                            ? 'client-rest-grey1'
                            : 'client-main-red'
                        }  w-[372px] mx-auto h-12 rounded-full ps-6 pe-0.5 flex align-middle justify-between absolute bottom-6 left-3 disabled cursor-pointer`}
                      >
                        <Text className="text-white my-auto">
                          {t('Checkout')}
                        </Text>
                        <Box
                          className={`text-${
                            basket?.data?.result?.data?.total_item == 0 ||
                            basket?.data?.result?.data?.total_item == undefined
                              ? 'client-rest-grey'
                              : 'client-main-red'
                          } w-32 h-11 bg-white rounded-full my-auto text-center pt-3`}
                        >
                          ${' '}
                          {basket?.data?.result?.data?.total_amount
                            ? basket?.data?.result?.data?.total_amount
                            : '0.00'}
                        </Box>
                      </Box>
                    </Box>
                  </Box>

                  {/* basket responsive */}
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
                          {basket?.data?.result?.data?.total_item == 0 ? (
                            <BasketEmpty />
                          ) : (
                            <BasketList />
                          )}
                          <Box
                            onClick={() => checkUser()}
                            className={`xl:hidden lg:hidden md:flex sm:flex xs:flex bg-${
                              basket?.data?.result?.data?.total_item == 0 ||
                              basket?.data?.result?.data?.total_item ==
                                undefined
                                ? 'client-rest-grey1'
                                : 'client-main-red'
                            } max-w-[372px] mx-auto h-12 rounded-full ps-6 pe-0.5 flex  justify-between  cursor-pointer`}
                          >
                            <Text className="text-white my-auto">
                              {t('Checkout')}
                            </Text>
                            <Box
                              className={`text-${
                                basket?.data?.result?.data?.total_item == 0 ||
                                basket?.data?.result?.data?.total_item ==
                                  undefined
                                  ? 'client-rest-grey'
                                  : 'client-main-red'
                              } w-32 h-11 bg-white rounded-full my-auto text-center pt-3`}
                            >
                              $
                              {basket?.data?.result?.data?.total_amount
                                ? basket?.data?.result?.data?.total_amount
                                : '0.00'}
                            </Box>
                          </Box>
                        </DrawerBody>
                      </DrawerContent>
                    </Drawer>
                  </section>
                </Box>
              </Box>
            </section>
          </main>
        </ClientLayout>
      </div>
    </div>
  )
}

export default RestaurantId

// export async function getStaticProps({ locale }: { locale: any }) {
//   return {
//     props: { ...(await serverSideTranslations(locale, ['client'])) },
//   }
// }

// export async function getStaticPaths() {
//   return {
//     paths: Array<string | { params: { ["restaurant_id": string]: string } }>,
//     fallback: true
//   }
// }
