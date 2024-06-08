import AdminAsideMenu from '@/shared/components/admin/AdminAsideMenu'
import AdminAsideMenuResponsive from '@/shared/components/admin/AdminAsideMenuResponsive'
import AdminHeader from '@/shared/components/admin/AdminHeader'
import AdminAddUpdateModal from '@/shared/components/admin/adminAddUpdateModal'
import AdminSecondaryComponent from '@/shared/components/admin/adminSecondaryComponent'
import Foody from '@/shared/components/common/foody'
import { getCategories, getCategoryById } from '@/shared/services/category'
import { Box, Button, useDisclosure, useToast } from '@chakra-ui/react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ButtonGroup, IconButton } from '@chakra-ui/react'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import { DeleteOffer, getOffers } from '@/shared/services/offers'
import AdminAddOfferModal from '@/shared/components/admin/adminAddUpdateModal'
import AdminEditOfferModal from '@/shared/components/admin/addEditOfferModal'
import { MdDeleteForever, MdEdit } from 'react-icons/md'
import DeleteModal from '@/shared/components/common/deleteModal'

interface OfferItem {
  id: number
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
    queryKey: ['offers'],
  })
  console.log('offer', data)
  const { mutate } = useMutation({
    mutationFn: DeleteOffer,
    onSuccess(data, variables, context) {
      console.log(data, 'success')
      toast({
        title: 'offer deleted',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    },
    onError(data, variables, context) {
      console.log(data, 'error')
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['offers'] })
    },
  })

  const handleDelete = (id: number) => {
    mutate(String(id))
  }

  const newData: OfferItem[] | undefined = data?.data?.result?.data

  return (
    <div>
      <Head>
        <title>Admin | {t('offers')}</title>
        <link rel="icon" href="/admin6024190.png" />
      </Head>

      <Box className="bg-admin-bg h-lvh">
        <Box className="max-w-[1440px] mx-auto">
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
              <table className="bg-white  m-5">
                <thead className="h-[50px] border-b-2">
                  <tr className="p-8">
                    <th className="w-[100px] text-center">{t('ID')}</th>
                    <th className="w-[100px] text-center">{t('Image')}</th>
                    <th className="w-[120px] text-center">{t('Name')}</th>
                    <th className="w-[200px] text-center">{t('Slug')}</th>
                  </tr>
                </thead>
                <tbody>
                  {newData?.map((item: OfferItem) => (
                    <tr className="h-[60px] border-b-2 p-8" key={item.id}>
                      <td className="w-[100px] text-center">{item.id}</td>
                      <td className="w-[100px] text-center">
                        <Image
                          src={item.img_url}
                          alt="Offer Image"
                          width={100}
                          height={100}
                        />
                      </td>
                      <td className="w-[100px] text-center">{item.name}</td>
                      <td className="w-[200px] text-center">
                        {item.description}
                      </td>
                      <td className="w-[140px] text-center">
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
                          <Button onClick={() => handleDelete(item?.id)}>
                            <span>
                              <DeleteModal isOpen={isOpen} onClose={onClose} />
                              <MdDeleteForever className="fill-admin-delete-icon w-5 h-5" />
                            </span>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
