import AdminAsideMenu from '@/shared/components/admin/AdminAsideMenu'
import AdminAsideMenuResponsive from '@/shared/components/admin/AdminAsideMenuResponsive'
import AdminHeader from '@/shared/components/admin/AdminHeader'
import AdminSecondaryComponent from '@/shared/components/admin/adminSecondaryComponent'
import { Box, Button, useDisclosure, useToast } from '@chakra-ui/react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { DeleteOffer, getOffers } from '@/shared/services/offers'
import AdminAddOfferModal from '@/shared/components/admin/adminAddUpdateModal'
import AdminEditOfferModal from '@/shared/components/admin/addEditOfferModal'
import { MdDeleteForever, MdEdit } from 'react-icons/md'
import DeleteModal from '@/shared/components/common/deleteModal'
import { shortText } from '@/shared/helpers/shortText'
import Swal from 'sweetalert2'

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react'
import { useCORP } from '@/shared/hooks/useCORP'
import { deleteCategory } from '@/shared/services/category'
import { QUERY } from '@/shared/constants/query'
interface OfferItem {
  id: string
  img_url: string
  name: string
  description: string
}

function Offers() {
  const { t } = useTranslation('admin')
  const [hideModal, setHideModal] = useState<boolean>(true)
  const [hideModalUpdateOffer, setHideModalUpdateOffer] = useState<boolean>(
    true,
  )
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [deleteProductId, setDeleteProductId] = useState<string | null>(null)

  const queryClient = useQueryClient()
  const toast = useToast()
  const { push, pathname } = useRouter()

  function showHideModal() {
    setHideModal((prev) => !prev)
  }
  function showHideModalUpdateOffer() {
    setHideModalUpdateOffer((prev) => !prev)
  }
  const { data } = useQuery({
    queryFn: getOffers,
    queryKey: [QUERY.OFFER],
  })
  // console.log('offer', data)
  // const { mutate } = useMutation({
  //   mutationFn: DeleteOffer,
  //   onSuccess(data, variables, context) {
  //     console.log(data, 'success')
  //     toast({
  //       title: 'offer deleted',
  //       status: 'success',
  //       duration: 3000,
  //       isClosable: true,
  //     })
  //   },
  //   onError(data, variables, context) {
  //     console.log(data, 'error')
  //   },
  //   onSettled: () => {
  //     queryClient.invalidateQueries({ queryKey: ['offers'] })
  //   },
  // })

  // const handleDelete = (id: number) => {
  //   Swal.fire({
  //     title: 'Are you sure?',
  //     text: 'You won\'t be able to revert this!',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Yes, delete it!'
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       mutate(String(id))
  //       Swal.fire(
  //         'Deleted!',
  //         'Your category has been deleted.',
  //         'success'
  //       )
  //     }
  //   })
  // }

  const { mutate } = useCORP({
    queryFn: DeleteOffer,
    queryKey: [QUERY.OFFER],
    toastText: 'Offer deleted',
  })

  const handleDeleteClick = (productId: string) => {
    setDeleteProductId(productId)
    onOpen()
  }

  const handleDeleteConfirm = () => {
    mutate(deleteProductId)
    onClose()
  }

  const newData: OfferItem[] | undefined = data?.data?.result?.data
  console.log('newData', newData)
  return (
    <div>
      <Head>
        <title>Admin | {t('offers')}</title>
        <link rel="icon" href="/admin6024190.png" />
      </Head>

      <Box className="bg-admin-bg h-lvh">
        <Box className="max-w-[1240px] mx-auto">
          <AdminHeader />
          <AdminAddOfferModal
            onClickClose={showHideModal}
            show={hideModal}
            text={t('Add Offers ')}
          />
          <AdminEditOfferModal
            onClickClose={showHideModalUpdateOffer}
            show={hideModalUpdateOffer}
            text={t('Edit  Offers ')}
          />
          <DeleteModal
            isOpen={isOpen}
            onClose={onClose}
            handleDeleteConfirm={handleDeleteConfirm}
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

              <Box className="max-w-[1040px]  ">
                <TableContainer className=" bg-white  m-5 md:overflow-x-auto scrollbar">
                  <Table variant="simple" className="bg-white">
                    <Thead h="50px" className=" border-b-2">
                      <Tr>
                        <Th className="text-center text-sm text-admin-table-black font-semibold">
                          ID
                        </Th>
                        <Th className=" text-center text-sm text-admin-table-black font-semibold">
                          {t('Image')}
                        </Th>
                        <Th className=" text-center text-sm text-admin-table-black font-semibold">
                          {t('Title')}
                        </Th>
                        <Th className="text-center text-sm text-admin-table-black font-semibold">
                          {t('Description')}
                        </Th>
                        <Th className="text-sm text-admin-table-black font-semibold"></Th>
                      </Tr>
                    </Thead>

                    <Tbody>
                      {newData?.map((item: OfferItem) => {
                        return (
                          <Tr key={item.id}>
                            <Td
                              py={1}
                              className=" w-[100px] text-sm text-admin-table-id"
                            >
                              <span className="border-2 rounded-lg p-1">
                                {item?.id}
                              </span>
                            </Td>
                            <Td
                              py={1}
                              className=" w-[100px] text-sm text-admin-table-black"
                            >
                              <Image
                                src={item?.img_url}
                                width={48}
                                height={42}
                                alt="table_image"
                              />
                            </Td>
                            <Td
                              py={1}
                              className=" w-[100px] text-sm text-admin-table-black "
                            >
                              {item?.name}
                            </Td>
                            <Td
                              py={1}
                              className=" w-[100px] text-sm text-admin-table-black "
                            >
                              {shortText(30, item?.description)}
                            </Td>
                            <Td>
                              <div className="flex gap-2">
                                <Button
                                  onClick={() => (
                                    push(pathname + '?id=' + item?.id),
                                    showHideModalUpdateOffer()
                                  )}
                                >
                                  <span>
                                    <MdEdit className="fill-admin-edit-icon w-5 h-5" />
                                  </span>
                                </Button>
                                <Button
                                  onClick={() => handleDeleteClick(item?.id)}
                                >
                                  <span>
                                    {/* //  <DeleteModal isOpen={isOpen} onClose={onClose} handleDelete={handleDelete}/> */}
                                    <MdDeleteForever className="fill-admin-delete-icon w-5 h-5" />
                                  </span>
                                </Button>
                              </div>
                            </Td>
                          </Tr>
                        )
                      })}
                    </Tbody>
                  </Table>
                </TableContainer>
              </Box>
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
