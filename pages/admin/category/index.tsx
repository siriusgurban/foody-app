import AdminAsideMenu from '@/shared/components/AdminAsideMenu'
import AdminAsideMenuResponsive from '@/shared/components/AdminAsideMenuResponsive'
import AdminHeader from '@/shared/components/AdminHeader'
import {
  deleteCategory,
  getCategories,
  getCategoryById,
} from '@/shared/services/category'
import {
  Box,
  Button,
  useToast,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import AdminRestaurantsDropdown from '@/shared/components/adminRestaurantsDropdown'
import { AddIcon } from '@chakra-ui/icons'
import { MdDeleteForever, MdEdit } from 'react-icons/md'
import AdminSecondaryComponent from '@/shared/components/adminSecondaryComponent'
import AdminRestaurantsCard from '@/shared/components/adminRestaurantCards'
import AdminAddUpdateModal from '@/shared/components/adminAddUpdateModal'
import AdminAddUpdateModalCategory from '@/shared/components/adminAddUpdateModalCategory'

function Category() {
  const { t } = useTranslation('admin')
  const [hideModal, setHideModal] = useState<boolean>(true)
  const toast = useToast()
  const { push, pathname } = useRouter()

  const { data } = useQuery({
    queryFn: getCategories,
    queryKey: ['categories'],
  })

  const { mutate } = useMutation({
    mutationFn: deleteCategory,
    onSuccess(data, variables, context) {
      console.log(data, 'success')
      toast({
        title: 'Category deleted',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    },
    onError(data, variables, context) {
      console.log(data, 'error')
    },
  })

  function handleDelete(id: any) {
    mutate(id)
  }
  function handleEdit(id: any, data: any) {
    console.log('edited')
  }

  function showHideModal() {
    setHideModal((prev) => !prev)
  }

  console.log(data?.data?.result?.data, 'cate')

  return (
    <div>
      <Head>
        <title>Admin | {t('category')}</title>
        <link rel="icon" href="/admin6024190.png" />
      </Head>

      <Box className="bg-admin-bg h-lvh">
        <Box className="max-w-[1440px] mx-auto">
          <AdminHeader />
          <Box className="flex gap-7">
            <AdminAsideMenu />
            <AdminAsideMenuResponsive />
            <Box className="flex flex-col gap-4 w-full">
              <div className="w-full">
                <div className="m-5">
                  <AdminAddUpdateModalCategory
                    onClickClose={showHideModal}
                    show={hideModal}
                    text={t('Add Category')}
                  />
                  <AdminSecondaryComponent
                    p={t('category')}
                    onClick={showHideModal}
                    visible={true}
                  />
                </div>
              </div>
              <TableContainer>
                <Table variant="simple" className="bg-white">
                  <Thead>
                    <Tr>
                      <Th>ID</Th>
                      <Th>Image</Th>
                      <Th>Name</Th>
                      <Th>Slug</Th>
                      <Th></Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {data?.data?.result?.data?.map(
                      (item: any, index: number) => {
                        return (
                          <Tr key={index}>
                            <Td py={1}>{item?.id}</Td>
                            <Td py={1}>
                              <Image
                                src={item?.img_url}
                                width={48}
                                height={42}
                                alt="table_image"
                              />
                            </Td>
                            <Td py={1}>{item?.name}</Td>
                            <Td py={1}>{item?.slug}</Td>
                            <Td>
                              <div className="flex justify-end gap-4">
                                <Button
                                  onClick={() => (
                                    push(pathname + '?id=' + item?.id),
                                    showHideModal()
                                  )}
                                >
                                  <span>
                                    <MdEdit className="fill-admin-edit-icon w-5 h-5" />
                                  </span>
                                </Button>
                                <button onClick={() => handleDelete(item?.id)}>
                                  <span>
                                    <MdDeleteForever className="fill-admin-delete-icon w-5 h-5" />
                                  </span>
                                </button>
                              </div>
                            </Td>
                          </Tr>
                        )
                      },
                    )}
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  )
}

export default Category

export async function getStaticProps({ locale }: { locale: any }) {
  return {
    props: { ...(await serverSideTranslations(locale, ['admin'])) },
  }
}
