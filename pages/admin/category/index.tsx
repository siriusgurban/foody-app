import { deleteCategory, getCategories } from '@/shared/services/category'
import { Box, Button, useDisclosure, useToast } from '@chakra-ui/react'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MdDeleteForever, MdEdit } from 'react-icons/md'
import AdminSecondaryComponent from '@/shared/components/adminSecondaryComponent'
import AdminUpdateModalCategory from '@/shared/components/adminUpdateModalCategory'
import AdminAddModalCategory from '@/shared/components/adminAddModalCategory'
import DeleteModal from '@/shared/components/deleteModal'
import AdminLayout from '@/shared/components/adminLayout'

import 'react-loading-skeleton/dist/skeleton.css'
import SkeletonRestaurant from '@/shared/components/skeleton/SkeletonRestaurant'
import SkeletonProduct from '@/shared/components/skeleton/SkeletonProduct'
import SkeletonTable from '@/shared/components/skeleton/SkeletonTable'

function Category() {
  const [hideModalUpdate, setHideModalUpdate] = useState<boolean>(true)

  const { t } = useTranslation('admin')
  const [hideModalAdd, setHideModalAdd] = useState<boolean>(true)
  const toast = useToast()
  const { push, pathname } = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryFn: getCategories,
    queryKey: ['categories'],
  })

  console.log(data?.data.result.data, 'datacategory')

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
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
  })

  function showHideModalUpdate() {
    console.log('hideModalUpdate clicked')
    setHideModalUpdate((prev) => !prev)
  }
  function showHideModalAdd() {
    setHideModalAdd((prev) => !prev)
  }

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true)
  }

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false)
  }

  const handleDeleteConfirm = (id: string) => {
    mutate(id)
    closeDeleteModal()
  }

  return (
    <div>
      <Head>
        <title>Admin | {t('category')}</title>
        <link rel="icon" href="/admin6024190.png" />
      </Head>
      <AdminLayout>
        <Box className="flex flex-col gap-4 w-full">
          <div className=" xl:w-full">
            <div className="m-5">
              <AdminUpdateModalCategory
                onClickClose={showHideModalUpdate}
                show={hideModalUpdate}
                text={t('Update Category')}
              />
              <AdminAddModalCategory
                onClickClose={showHideModalAdd}
                show={hideModalAdd}
                text={t('addcategory').toLocaleUpperCase()}
              />
              <AdminSecondaryComponent
                p={t('category')}
                onClick={showHideModalAdd}
                visible={false}
              />
            </div>
          </div>
          <TableContainer className="md:overflow-x-auto">
            <Table variant="simple" className="bg-white">
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>{t('Image')}</Th>
                  <Th>{t('Name')}</Th>
                  <Th>{t('Slug')}</Th>
                  <Th></Th>
                </Tr>
              </Thead>

              <Tbody>
                {data?.data?.result?.data?.map((item: any, index: number) => {
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
                              showHideModalUpdate()
                            )}
                          >
                            <span>
                              <MdEdit className="fill-admin-edit-icon w-5 h-5" />
                            </span>
                          </Button>
                          <button onClick={() => handleDeleteConfirm(item?.id)}>
                            <span>
                              <DeleteModal
                                // isOpen={isDeleteModalOpen}
                                // onClose={closeDeleteModal}
                                onClick={() => handleDeleteConfirm(item?.id)}
                              />
                              <MdDeleteForever className="fill-admin-delete-icon w-5 h-5" />
                            </span>
                          </button>
                        </div>
                      </Td>
                    </Tr>
                  )
                })}
              </Tbody>
            </Table>
            {isLoading ? <SkeletonTable /> : ''}
          </TableContainer>
        </Box>
      </AdminLayout>
    </div>
  )
}

export default Category

export async function getStaticProps({ locale }: { locale: any }) {
  return {
    props: { ...(await serverSideTranslations(locale, ['admin'])) },
  }
}
