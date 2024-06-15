import React, { useEffect, useState } from 'react'
import AdminRestaurantsCard from '@/shared/components/admin/adminRestaurantCards'
import AdminSecondaryComponent from '@/shared/components/admin/adminSecondaryComponent'
import Head from 'next/head'
import { useTranslation } from 'react-i18next'
import { Box, Toast, useDisclosure } from '@chakra-ui/react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { deleteRestuarant, getRestuarants } from '@/shared/services/restaurants'
import AdminAddModalRest from '@/shared/components/admin/AdminAddModalRest'
import AdminUpdateModalRest from '@/shared/components/admin/AdminUpdateModalRest'
import { Restaurant } from '@/shared/types/admin'
import AdminLayout from '@/shared/components/layout/adminLayout'
import SkeletonRestaurant from '@/shared/components/common/skeleton/SkeletonRestaurant'
import { QUERY } from '@/shared/constants/query'
import { useCORP } from '@/shared/hooks/useCORP'
import DeleteModal from '@/shared/components/common/deleteModal'

const Restaurants: React.FC = () => {
  const { t } = useTranslation('admin')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [hideModal, setHideModal] = useState<boolean>(true)
  const [hideModalUpdate, setHideModalUpdate] = useState<boolean>(true)
  const [filterCategory, setFilterCategory] = useState<string>('All')
  const [deleteProductId, setDeleteProductId] = useState<string | null>(null)

  // get restaurants
  const { data, isLoading, isError } = useQuery({
    queryFn: getRestuarants,
    queryKey: [QUERY.RESTAURANTS],
  })

  const restaurantsDatas: Restaurant[] = data?.data?.result?.data ?? []

  // filter category
  const filteredRestaurants =
    filterCategory == 'All'
      ? restaurantsDatas
      : restaurantsDatas.filter(
          (restaurant: any) => restaurant?.category_id == filterCategory,
        )

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
          <div className="my-5">
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
          <div className=" sm:w-auto m-2 sm:m-5 flex flex-wrap gap-x-7 justify-center overflow-y-scroll max-h-[390px] scrollbar ">
            {isLoading ? (
              <Box className="flex flex-wrap gap-2 justify-between ">
                {[1, 2, 3, 4].map((item, index) => {
                  return <SkeletonRestaurant key={index} />
                })}
              </Box>
            ) : (
              filteredRestaurants &&
              filteredRestaurants.map((restaurant, index) => (
                <AdminRestaurantsCard
                  // onDelete={handleDelete}
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
