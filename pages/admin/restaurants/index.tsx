import React, { useEffect, useState } from 'react'
import AdminRestaurantsCard from '@/shared/components/adminRestaurantCards'
import AdminSecondaryComponent from '@/shared/components/adminSecondaryComponent'
import Head from 'next/head'
import { useTranslation } from 'react-i18next'
import AdminHeader from '@/shared/components/AdminHeader'
import AdminAsideMenu from '@/shared/components/AdminAsideMenu'
import { Box, Toast } from '@chakra-ui/react'
import AdminAsideMenuResponsive from '@/shared/components/AdminAsideMenuResponsive'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { deleteRestuarant, getRestuarants } from '@/shared/services/restaurants'
import AdminAddModalRest from '@/shared/components/AdminAddModalRest'
import AdminUpdateModalRest from '@/shared/components/AdminUpdateModalRest'
import { Restaurant } from '@/shared/types/admin'
import { getCategories } from '@/shared/services/category'
import AdminLayout from '@/shared/components/adminLayout'
import SkeletonCard from '@/shared/components/SkeletonCard'
import Skeleton from 'react-loading-skeleton'
import SkeletonProduct from '@/shared/components/SkeletonRestaurant'
import SkeletonRestaurant from '@/shared/components/SkeletonRestaurant'

const Restaurants: React.FC = () => {
  const { t } = useTranslation('admin')
  const [hideModal, setHideModal] = useState<boolean>(false)
  const [hideModalUpdate, setHideModalUpdate] = useState<boolean>(false)
  const [filterCategory, setFilterCategory] = useState<string>('All')

  // get restaurants
  const { data, isLoading, isError } = useQuery({
    queryFn: getRestuarants,
    queryKey: ['restaurants'],
  })

  const restaurantsDatas: Restaurant[] = data?.data?.result?.data ?? []

  // filter category
  const filteredRestaurants =
    filterCategory == 'All'
      ? restaurantsDatas
      : restaurantsDatas.filter(
          (restaurant: any) => restaurant?.category_id == filterCategory,
        )

  // delete
  const QueryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: deleteRestuarant,
    onSuccess(data, variables, context) {
      console.log(data, 'success')
      Toast({
        title: 'Restaurant deleted',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    },
    onError(data, variables, context) {
      console.log(data, 'error')
    },
    onSettled: () => {
      QueryClient.invalidateQueries({ queryKey: ['restaurants'] })
    },
  })

  function handleDelete(restaurantId: any) {
    console.log('deleting restaurant :', restaurantId)
    mutate(restaurantId)
  }

  function showHideModalUpdate() {
    setHideModalUpdate((prev) => !prev)
  }

  function showHideModal() {
    setHideModal((prev) => !prev)
  }

  return (
    <>
      <Head>
        <title>Admin | {t('restaurants')}</title>
        <link rel="icon" href="/admin6024190.png" />
      </Head>
      <AdminLayout>
        <div className="w-full">
          <div className="m-5">
            <AdminUpdateModalRest
              onClickClose={showHideModalUpdate}
              show={hideModalUpdate}
              text={t('Update Restaurant')}
            />
            <AdminAddModalRest
              onClickClose={showHideModal}
              show={hideModal}
              text={t('Add Restaurant ')}
            />
            <AdminSecondaryComponent
              p={t('Restaurants')}
              onClick={showHideModal}
              visible={true}
              getText={setFilterCategory}
            />
          </div>
          <div className=" sm:w-auto m-5 flex flex-wrap gap-4 justify-center overflow-y-scroll max-h-[390px] scrollbar ">
            {isLoading ? (
              <Box className="flex flex-wrap justify-between ">
                {[1, 2, 3, 4, 5].map((item, index) => {
                  return <SkeletonRestaurant key={index} />
                })}
              </Box>
            ) : (
              filteredRestaurants &&
              filteredRestaurants.map((restaurant, index) => (
                <AdminRestaurantsCard
                  onDelete={handleDelete}
                  key={index}
                  img_url={restaurant.img_url}
                  name={restaurant.name}
                  restaurant_id={restaurant.id}
                  category_id={restaurant?.category_id}
                  onClickClose={showHideModalUpdate}
                />
              ))
            )}
          </div>
        </div>
      </AdminLayout>
    </>
  )
}

export default Restaurants

export async function getStaticProps({ locale }: { locale: any }) {
  return {
    props: { ...(await serverSideTranslations(locale, ['admin'])) },
  }
}
