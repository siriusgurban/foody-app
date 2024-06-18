import React, { useEffect, useRef, useState } from 'react'
import AdminModalUploadImage from '../adminModalUploadImage'
import AdminModalInput from '../adminModalInput'
import AdminModalTextArea from '../adminModalText'
import AdminModalDropdown from '../adminModalDropdown'
import { IoClose } from 'react-icons/io5'
import AdminModalButton from '../adminModalButton'
import { useTranslation } from 'react-i18next'
import {
  getRestuarantById,
  updateRestuarant,
} from '@/shared/services/restaurants'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@chakra-ui/react'
import { useImageUpload } from '@/shared/hooks/useImageUpload'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { getCategories } from '@/shared/services/category'
import { QUERY } from '@/shared/constants/query'
import { useCORP } from '@/shared/hooks/useCORP'
import AdminAsideModal from '../../layout/adminAsideModal'

interface Props {
  show?: boolean
  onClickClose?: any
  text: string
}

const AdminUpdateModalRest = ({ show = true, onClickClose, text }: Props) => {
  const imgRef = useRef<any>(null)
  let nameRef = useRef<any>(null)
  let cuisineRef = useRef<any>(null)
  let deliveryPriceRef = useRef<any>(null)
  let deliveryMinRef = useRef<any>(null)
  let addressRef = useRef<any>(null)
  // let categoryRef = useRef<any>(null)

  const { query } = useRouter()
  const { data } = useQuery({
    queryFn: () => getRestuarantById(query.id as string),
    queryKey: [QUERY.RESTAURANTS, query.id],
  })

  const { mutate } = useCORP({
    queryFn: updateRestuarant,
    queryKey: [QUERY.RESTAURANTS],
    toastText: 'Restaurant updated',
    onClickClose: () => onClickClose(),
  })

  const [category, setCategory] = useState<string | null>(
    data?.data?.result?.data?.category_id,
  )

  const queryClient = useQueryClient()
  const toast = useToast()
  const { t } = useTranslation('admin')

  // console.log(data, 'datadatadataRest')

  let initUrl = data?.data?.result?.data?.img_url
  const { loading, imgUrl, getImage } = useImageUpload(initUrl)
  const img = imgUrl

  useEffect(() => {
    if (data) {
      nameRef.current.value = data?.data?.result?.data?.name
      cuisineRef.current.value = data?.data?.result?.data?.cuisine
      deliveryPriceRef.current.value = data?.data?.result?.data?.delivery_price
      deliveryMinRef.current.value = data?.data?.result?.data?.delivery_min
      addressRef.current.value = data?.data?.result?.data?.address
      setCategory(data?.data?.result?.data?.category_id)
    }
  }, [data, query.id])

  async function handleRestaurant() {
    const name = nameRef?.current?.value
    const cuisine = cuisineRef?.current?.value
    const deliveryPrice = deliveryPriceRef?.current?.value
    const deliveryMin = deliveryMinRef?.current?.value
    const address = addressRef?.current?.value
    // const category = categoryRef?.current?.value

    const form = {
      // ...data?.data?.result?.data,
      name: name,
      cuisine: cuisine,
      delivery_price: deliveryPrice,
      delivery_min: deliveryMin,
      address: address,
      category_id: category,
      img_url: img,
    }

    console.log(form, 'form')

    mutate({ id: query?.id, data: form })
  }

  return (
    <AdminAsideModal
      show={show}
      onClickClose={onClickClose}
      handleEvent={handleRestaurant}
      handleEventText="Update Restaurant"
      text={text}
      imgRef={imgRef}
      loading={loading}
      imgUrl={imgUrl}
      getImage={getImage}
      modalText="Add Your Restaurant Information"
    >
      <div className="bg-admin-modal-frame-bg w-full lg:w-2/3 pt-5 pl-5 pr-7 rounded-2xl max-h-[390px] overflow-y-scroll scrollbar">
        <div className="flex flex-col gap-2">
          <p className=" font-medium text-admin-text  text-base font-display">
            {t('Name')}
          </p>
          <input
            type="text"
            id="name"
            name="name"
            ref={nameRef}
            // value={initName}
            placeholder={t('Mc Donald’s')}
            className="rounded-2xl  text-whiteLight  font-medium text-base  bg-admin-input   text-admin-modal-placeholder pl-5 py-3  capitalize font-display"
          />
          {/* {errors?.slug && (
                  <FormHelperText color="red">{errors?.name}</FormHelperText>
                )} */}
          <p className=" font-medium   text-admin-text  text-base font-display">
            {t('Cuisine')}
          </p>
          <input
            type="text"
            id="name"
            name="name"
            ref={cuisineRef}
            // value={initName}
            placeholder={t('Fast Food , Drink, Ice Cream, Sea Food')}
            className="rounded-2xl  text-whiteLight  font-medium text-base  bg-admin-input   text-admin-modal-placeholder pl-5 py-3  capitalize font-display"
          />
          {/* {errors?.slug && (
                  <FormHelperText color="red">{errors?.name}</FormHelperText>
                )} */}
          <p className=" font-medium   text-admin-text  text-base font-display">
            {t('Delivery Price $')}
          </p>
          <input
            type="text"
            id="name"
            name="name"
            ref={deliveryPriceRef}
            // value={initName}
            placeholder={t('name')}
            className="rounded-2xl  text-whiteLight  font-medium text-base  bg-admin-input   text-admin-modal-placeholder pl-5 py-3  capitalize font-display"
          />
          {/* {errors?.slug && (
                  <FormHelperText color="red">{errors?.name}</FormHelperText>
                )} */}
          <p className=" font-medium   text-admin-text  text-base font-display">
            {t('Delivery Mi')}
          </p>
          <input
            type="text"
            id="name"
            name="name"
            ref={deliveryMinRef}
            // value={initName}
            placeholder={t('name')}
            className="rounded-2xl  text-whiteLight  font-medium text-base  bg-admin-input   text-admin-modal-placeholder pl-5 py-3  capitalize font-display"
          />
          {/* {errors?.slug && (
                  <FormHelperText color="red">{errors?.name}</FormHelperText>
                )} */}
          <p className=" font-medium   text-admin-text  text-base font-display">
            {t('Address')}
          </p>
          <input
            type="text"
            id="name"
            name="name"
            ref={addressRef}
            // value={initName}
            placeholder={t('Nizami street 45 Baku Azerbaijan')}
            className="rounded-2xl  text-whiteLight  font-medium text-base  bg-admin-input   text-admin-modal-placeholder pl-5 py-3  capitalize font-display"
          />
          {/* {errors?.slug && (
                  <FormHelperText color="red">{errors?.name}</FormHelperText>
                )} */}
          <AdminModalDropdown
            p={t('Category')}
            className="mt-4 mb-2 placeholder"
            classNameSelect="bg-admin-input w-full text-admin-text rounded-2xl pl-3 font-medium text-base py-4 font-display"
            getText={setCategory}
            getData={getCategories}
            queryKey="categories"
          />
        </div>
      </div>
    </AdminAsideModal>
  )
}

export default AdminUpdateModalRest
