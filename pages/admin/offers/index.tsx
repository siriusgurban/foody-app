import AdminAsideMenu from '@/shared/components/AdminAsideMenu'
import AdminAsideMenuResponsive from '@/shared/components/AdminAsideMenuResponsive'
import AdminHeader from '@/shared/components/AdminHeader'
import AdminAddUpdateModal from '@/shared/components/adminAddUpdateModal'
import AdminSecondaryComponent from '@/shared/components/adminSecondaryComponent'
import Foody from '@/shared/components/foody'
import { getCategories, getCategoryById } from '@/shared/services/category'
import { Box, Button, useToast } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import{
  ButtonGroup,IconButton
 
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
function Offers() {
  const { t } = useTranslation('admin')
  const [hideModal, setHideModal] = useState<boolean>(true)

  function showHideModal() {
    setHideModal((prev) => !prev)
  }

  return (
    <div>
      <Head>
        <title>Admin | {t('offers')}</title>
        <link rel="icon" href="/admin6024190.png" />
      </Head>

      <Box className="bg-admin-bg h-lvh">
        <Box className="max-w-[1440px] mx-auto">
          <AdminHeader />
          <AdminAddUpdateModal
            onClickClose={showHideModal}
            show={hideModal}
            text={t('Add Offers ')}
          />
           <main className="flex">
            <div className=" hidden sm:block">
              <AdminAsideMenu />
              <AdminAsideMenuResponsive />
            </div>
            <div className="w-full mb-5 flex flex-col ">
              <div className="m-5">
                <AdminSecondaryComponent
                  p={t('Offers')}
                  onClick={showHideModal}
                  visible={false}
                />
              </div>
              <table   className="bg-white  m-5"  >
                  <thead className='h-[50px] border-b-2'>
                    <tr className='p-8'>
                      <th className='w-[100px] text-center'>ID</th>
                      <th className='w-[100px] text-center'>Image</th>
                      <th className='w-[120px] text-center'>Name</th>
                      <th className='w-[200px] text-center'>Slug</th>
                    </tr>
                  </thead>
                  <tbody >
                    <tr className='h-[60px] border-b-2 p-8'>
                      <td className='w-[100px] text-center'>
                        9177
                      </td>
                      <td className='w-[100px] text-center'>
                      <Image src="" alt='d'/>
                      </td> <td className='w-[100px] text-center'>
                      Pizza
                      </td> <td  className='w-[200px] text-center'>
                      yummy-pizza 
                      </td> <td className='w-[140px] text-center'>
                      <ButtonGroup>
                                        <IconButton
                                            colorScheme="teal"
                                            aria-label="Edit"
                                            icon={<EditIcon />}
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
            </div>
        
          </main>
        </Box>
      </Box>
    </div>
  )
}

export default Offers

export async function getStaticProps({ locale }: { locale: any }) {
  return {
    props: { ...(await serverSideTranslations(locale, ['admin'])) },
  }
}
