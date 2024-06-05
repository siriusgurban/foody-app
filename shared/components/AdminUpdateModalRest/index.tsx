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
    queryKey: ['restaurants', query.id],
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

  const { mutate } = useMutation({
    mutationFn: updateRestuarant,
    onSuccess: () => {
      toast({
        title: 'Restaurant updated',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      onClickClose()
    },
    onError: (error) => {
      console.error('Error adding restaurant:', error)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['restaurants'] })
    },
  })

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
    <div
      className={`fixed z-10 w-full sm:w-3/4 sm:pl-10 ${
        show ? 'right-0' : '-right-full'
      } h-screen top-0 transition-all duration-700`}
    >
      <button
        onClick={onClickClose}
        className="rounded-full bg-admin-modal-upload-icon absolute right-5 sm:left-0 top-7 w-7 h-7 cursor-pointer"
      >
        <IoClose className="fill-admin-white h-4 w-6 pl-1" />
      </button>
      <div className="bg-admin-main flex-col pl-7 pt-3 pb-5 pr-7 lg:pr-14 max-h-screen overflow-y-auto">
        <div>
          <p className="text-2xl text-admin-text font-medium mb-8 ">{text}</p>
        </div>
        <div className="flex flex-col w-full lg:flex-row mb-16">
          <div className="w-full h-36 lg:w-1/3">
            <p className="font-medium text-lg text-admin-text mb-3">
              {t('Upload Image')}
            </p>
            <Image
              width={118}
              height={122}
              alt="Upload"
              ref={imgRef}
              src={`${
                loading ? '/loadingImage.png' : imgUrl ? imgUrl : '/upload.png'
              }`}
            />
          </div>
          <div className="w-full lg:w-2/3 h-38">
            <AdminModalUploadImage onChange={getImage} />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row w-full mb-10">
          <div className="w-full lg:w-1/3">
            <p className="font-medium text-admin-text tracking-wide capitalize text-lg font-display">
              {t(`Add Your Restaurant Information`)}
            </p>
          </div>
          <div className="bg-admin-modal-frame-bg w-full lg:w-2/3 pt-5 pl-5 pr-7 rounded-2xl max-h-[390px] overflow-y-scroll scrollbar">
            <div>
              <div className="flex flex-col gap-2 ">
                <p className=" font-medium   text-admin-text  text-base font-display">
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
                />
              </div>

              {/* <>
                <AdminModalInput
                  p={t('Name')}
                  className2="flex flex-col gap-2"
                  placeHolder="Mc Donald’s"
                  getText={setName}
                />
                <AdminModalTextArea
                  p={t('Cuisine')}
                  className="mt-6"
                  placeHolder="Fast Food , Drink, Ice Cream, Sea Food"
                  getText={setCuisine}
                />
                <AdminModalInput
                  type="number"
                  p={t('Delivery Price $')}
                  className2="flex flex-col gap-2 mt-8"
                  placeHolder="5"
                  getText={(text) => setDeliveryPrice(parseInt(text))}
                />
                <AdminModalInput
                  type="number"
                  p={t('Delivery Mi')}
                  className2="flex flex-col gap-2 mt-6"
                  placeHolder="11"
                  getText={(text) => setDeliveryMin(parseInt(text))}
                />
                <AdminModalInput
                  p={t('Address')}
                  className2="flex flex-col gap-2 mt-4"
                  placeHolder="Nizami street 45 Baku Azerbaijan"
                  getText={setAddress}
                />
                <AdminModalDropdown
                  p={t('Category')}
                  className="mt-4 mb-2 placeholder"
                  classNameSelect="bg-admin-input w-full text-admin-text rounded-2xl pl-3 font-medium text-base py-4 font-display"
                  getText={setCategory}
                />
              </> */}
            </div>
          </div>
        </div>
        <div className="flex justify-around border-t-2 border-t-admin-cancel-btn pt-6 border-admin-main gap-10">
          <AdminModalButton
            onClick={onClickClose}
            className="text-admin-white bg-admin-cancel-btn py-3 w-1/2 rounded-2xl font-display"
            text={t('Cancel')}
          />

          <AdminModalButton
            onClick={handleRestaurant}
            className="text-admin-white bg-admin-modal-purple-btn w-1/2 rounded-2xl font-display"
            text={t('Update Restaurant')}
          />
        </div>
      </div>
    </div>
  )
}

export default AdminUpdateModalRest
