import React, { useEffect, useRef, useState } from 'react'
import { IoClose } from 'react-icons/io5'
import AdminModalButton from '../adminModalButton'
import { useTranslation } from 'react-i18next'
import { FormControl, Text, useToast } from '@chakra-ui/react'
import { postCategory } from '@/shared/services/category'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import { IoMdCloudUpload } from 'react-icons/io'
import { useImageUpload } from '@/shared/hooks/useImageUpload'
import { postProduct } from '@/shared/services/products'
import AdminModalDropdown from '../adminModalDropdown'
import { getRestuarants } from '@/shared/services/restaurants'
import { QUERY } from '@/shared/constants/query'
import { useCORP } from '@/shared/hooks/useCORP'
import AdminAsideModal from '../../layout/adminAsideModal'

interface Props {
  show?: boolean
  onClickClose?: any
  text: string
}
const AdminAddModalProduct = ({ show = true, onClickClose, text }: Props) => {
  const { t } = useTranslation('admin')
  const nameRef = useRef<any>('')
  const descriptionRef = useRef<any>('')
  const priceRef = useRef<any>('')
  // const [description, setDescription] = useState<string | null>('')
  const [restId, setRestId] = useState<string | null>('')
  const imgRef = useRef<any>(null)

  async function addProduct() {
    const name = nameRef?.current?.value
    const description = descriptionRef?.current?.value
    const price = priceRef?.current?.value
    const img = imgUrl

    const form = {
      name: name,
      description: description,
      price: price,
      rest_id: restId,
      img_url: img,
    }

    mutate(form)

    nameRef.current.value = ''
    descriptionRef.current.value = ''
    priceRef.current.value = ''
  }

  const { mutate } = useCORP({
    queryFn: postProduct,
    queryKey: [QUERY.PRODUCTS],
    toastText: 'Product added',
    onClickClose: () => onClickClose(),
  })

  const { loading, imgUrl, getImage } = useImageUpload()

  return (
    <AdminAsideModal
      show={show}
      onClickClose={onClickClose}
      handleEvent={addProduct}
      handleEventText="Add Product"
      text={text}
      imgRef={imgRef}
      loading={loading}
      imgUrl={imgUrl}
      getImage={getImage}
      modalText="Add your Product description and necessary information"
    >
      <div className="  bg-admin-modal-frame-bg w-full lg:w-2/3  py-5 pl-5  pr-7    rounded-2xl max-h-[390px] overflow-y-scroll scrollbar ">
        <FormControl className="p-0">
          <div className="flex flex-col gap-2 ">
            <p className=" font-medium   text-admin-text  text-base font-display">
              {t('Name')}
            </p>
            <input
              type="text"
              id="name"
              name="name"
              ref={nameRef}
              placeholder={t('name')}
              className="rounded-2xl  text-whiteLight  font-medium text-base  bg-admin-input   text-admin-modal-placeholder pl-5 py-3  capitalize font-display"
            />
            {/* {errors?.slug && (
                  <FormHelperText color="red">{errors?.name}</FormHelperText>
                )} */}
          </div>

          <div className="flex flex-col gap-2 ">
            <p className=" font-medium   text-admin-text  text-base font-display">
              {t('Description')}
            </p>
            <input
              type="string"
              id="description"
              name="description"
              placeholder={t('Description')}
              ref={descriptionRef}
              className="rounded-2xl  text-whiteLight  font-medium text-base  bg-admin-input   text-admin-modal-placeholder pl-5 py-3  capitalize font-display"
            />
            {/* {errors?.slug && (
                  <FormHelperText color="red">{errors?.slug}</FormHelperText>
                )} */}
          </div>
          <div className="flex flex-col gap-2 ">
            <p className=" font-medium   text-admin-text  text-base font-display">
              {t('Price')}
            </p>
            <input
              type="number"
              id="price"
              name="price"
              placeholder={t('Price')}
              ref={priceRef}
              className="rounded-2xl  text-whiteLight  font-medium text-base  bg-admin-input   text-admin-modal-placeholder pl-5 py-3  capitalize font-display"
            />
            {/* {errors?.slug && (
                  <FormHelperText color="red">{errors?.slug}</FormHelperText>
                )} */}
          </div>
          <AdminModalDropdown
            p={t('Restaurants')}
            className="mt-4 mb-2 placeholder"
            classNameSelect="bg-admin-input w-full text-admin-text rounded-2xl pl-3 font-medium text-base py-4 font-display"
            getText={setRestId}
            getData={getRestuarants}
            queryKey="restaurants"
          />
        </FormControl>
      </div>
    </AdminAsideModal>
  )
}

export default AdminAddModalProduct
