import React, { useState } from 'react'
import AdminRestaurantsCard from '@/shared/components/adminRestaurantCards'

import AdminSecondaryComponent from '@/shared/components/adminSecondaryComponent'
import Head from 'next/head'
import { useTranslation } from 'react-i18next'
import AdminHeader from '@/shared/components/AdminHeader'
import AdminAsideMenu from '@/shared/components/AdminAsideMenu'
import { Box, Toast } from '@chakra-ui/react'
import AdminAsideMenuResponsive from '@/shared/components/AdminAsideMenuResponsive'
import AdminAddUpdateModal from '../../../shared/components/adminAddUpdateModal'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { deleteRestuarant } from '@/shared/services/restaurants'
import AdminAddUpdateModal2 from '@/shared/components/adminAddUpdateModal2'

const Restaurants: React.FC = () => {
  const { t } = useTranslation('admin')
  const [hideModal, setHideModal] = useState<boolean>(true)

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

  function handleDelete(id: any) {
    console.log('deleting restaurant :', id)
    mutate(id)
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
      <div className=" bg-admin-bg  min-h-screen">
        <Box className="max-w-[1440px] mx-auto">
          <AdminHeader />

          <AdminAddUpdateModal2
            onClickClose={showHideModal}
            show={hideModal}
            text={t('Add Restaurant ')}
          />
          <main className="flex">
            <div className=" hidden sm:block">
              <AdminAsideMenu />
              <AdminAsideMenuResponsive />
            </div>
            <div className="w-full">
              <div className="m-5">
                <AdminSecondaryComponent
                  p={t('Restaurants')}
                  onClick={showHideModal}
                  visible={true}
                />
              </div>
              <div className=" sm:w-auto m-5 flex flex-wrap gap-4 justify-center overflow-y-scroll max-h-[390px] scrollbar ">
                <AdminRestaurantsCard onClick={handleDelete} />
              </div>
            </div>
          </main>
        </Box>
      </div>
    </>
  )
}

export default Restaurants

export async function getStaticProps({ locale }: { locale: any }) {
  return {
    props: { ...(await serverSideTranslations(locale, ['admin'])) },
  }
}
