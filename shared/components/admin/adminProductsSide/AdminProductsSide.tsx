import { Box, Image, Text, useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { getProducts, deleteProduct } from '../../../services/products'
import { useTranslation } from 'react-i18next'
import DeleteModal from '../../common/deleteModal'
import AdminModalDropdown from '../adminModalDropdown'
import AdminModalButton from '../adminModalButton'
import { useQuery } from '@tanstack/react-query'
import { getRestuarants } from '@/shared/services/restaurants'
import AdminUpdateModalProduct from '../adminUpdateModalProduct'
import { Product, Restaurant } from '@/shared/types/admin'
import { useRouter } from 'next/router'
import { QUERY } from '@/shared/constants/query'
import SkeletonProduct from '../../common/skeleton/SkeletonProduct'
import { useCORP } from '@/shared/hooks/useCORP'

function AdminProductsSide() {
  const { t } = useTranslation('admin')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [deleteProductId, setDeleteProductId] = useState<string | null>(null)
  const [hideModalAddPro, setHideModalAddPro] = useState<boolean>(true)
  const [filterRest, setFilterRest] = useState<string>('All')
  const { pathname, push } = useRouter()

  const { data, isLoading } = useQuery({
    queryFn: getProducts,
    queryKey: [QUERY.PRODUCTS],
  })

  const { data: resto } = useQuery({
    queryFn: getRestuarants,
    queryKey: [QUERY.RESTAURANTS],
  })

  const productsDatas: Product[] = data?.data?.result?.data ?? []

  // filter restuarants
  const filteredProducts =
    filterRest == 'All'
      ? productsDatas
      : productsDatas.filter((product: any) => product?.rest_id == filterRest)

  function handleRestaurant(id: string) {
    let RestName = resto?.data?.result?.data.find(
      (item: any, index: number) => id == item?.id,
    )
    return RestName?.name
  }

  const { mutate } = useCORP({
    queryFn: deleteProduct,
    queryKey: [QUERY.PRODUCTS],
    toastText: 'Product deleted',
  })

  const handleDeleteClick = (productId: string) => {
    setDeleteProductId(productId)
    onOpen()
  }

  const handleDeleteConfirm = () => {
    mutate(deleteProductId)
    onClose()
  }

  function showHideModalAdd() {
    setHideModalAddPro((prev) => !prev)
  }

  return (
    <>
      <Box width="100%" className="h-screen">
        <div className="bg-admin-secondary rounded-2xl flex flex-col sm:flex-row justify-between items-center p-5 mt-5">
          <div className="text-admin-secondary-heading text-xl font-medium">
            {t(`products`)}
          </div>
          <div className="mt-3 sm:mt-0 flex flex-col items-center sm:flex-row gap-5">
            <AdminModalDropdown
              className="flex width-200 gap-3"
              classNameSelect="rounded-2xl py-2 px-2 bg-admin-input font-medium text-base text-admin-secondary-heading w-[170px] overflow-x-auto"
              getText={setFilterRest}
              getData={getRestuarants}
              queryKey="restaurants"
            />
            <AdminModalButton className="text-admin-secondary-add bg-admin-add-button-bg text-sm px-4 py-2 rounded-sm font-bold sm:rounded-2xl flex gap-2 align-middle">
              <Image src="/adminproducts/search.svg" />
              {t(`search`)}
            </AdminModalButton>
          </div>
        </div>

        <AdminUpdateModalProduct
          onClickClose={showHideModalAdd}
          show={hideModalAddPro}
          text={t('updateproduct')}
        />

        <Box display="flex" gap="40px" flexWrap="wrap" justifyContent="start">
          {isLoading ? (
            <Box className="flex flex-wrap gap-5 justify-between my-12">
              {[1, 2, 3, 4, 5].map((item, index) => {
                return <SkeletonProduct key={index} />
              })}
            </Box>
          ) : (
            filteredProducts &&
            filteredProducts.map((product, index) => (
              <Box
                key={index}
                className="productCards"
                w="196px"
                bg="white"
                mt="52px"
                pb="12px"
                display="flex"
                flexDir="column"
                justifyContent="space-evenly"
                borderRadius="5"
              >
                <Image
                  alt={product.name}
                  src={product.img_url}
                  ml="auto"
                  mr="auto"
                  mt="15px"
                  w="160px"
                  h="160px"
                  className="object-cover"
                />
                <Box className="texts" ml="17px">
                  <Text fontSize="18px" fontFamily="Roboto" fontWeight="500">
                    {product?.name}
                  </Text>
                  <Text
                    fontSize="14px"
                    fontFamily="Roboto"
                    fontWeight="500"
                    textColor="#8E8E93"
                  >
                    {handleRestaurant(product?.rest_id)}
                  </Text>
                </Box>
                <Box display="flex" ml="17px" gap="80px" mt="5px">
                  <Text
                    fontSize="12px"
                    fontFamily="Roboto"
                    fontWeight="500"
                    textColor="#00B2A9"
                  >
                    ${product.price}
                  </Text>
                  <Box display="flex" gap="12px" alignItems="center">
                    <Text
                      onClick={() => handleDeleteClick(product.id)}
                      cursor="pointer"
                    >
                      <img src="/adminproducts/garbage.svg" alt="delete" />
                    </Text>
                    <Text
                      onClick={() => {
                        push(pathname + '?id=' + product.id), showHideModalAdd()
                      }}
                      cursor="pointer"
                    >
                      <img src="/adminproducts/pen.svg" alt="edit" />
                    </Text>
                  </Box>
                </Box>
              </Box>
            ))
          )}
        </Box>
      </Box>

      <DeleteModal
        isOpen={isOpen}
        onClose={onClose}
        handleDeleteConfirm={handleDeleteConfirm}
      />
    </>
  )
}

export default AdminProductsSide
