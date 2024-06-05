import React, { useRef, useState } from 'react'
import AdminModalUploadImage from '../adminModalUploadImage'
import AdminModalInput from '../adminModalInput'
import AdminModalTextArea from '../adminModalText'
import AdminModalDropdown from '../adminModalDropdown'
import { IoClose } from 'react-icons/io5'
import AdminModalButton from '../adminModalButton'
import { useTranslation } from 'react-i18next'
import { postRestuarant } from '@/shared/services/restaurants'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@chakra-ui/react'
import { useImageUpload } from '@/shared/hooks/useImageUpload'
import Image from 'next/image'

interface Props {
  show?: boolean
  onClickClose?: any
  text: string
}

const AdminAddModalRest = ({ show = true, onClickClose, text }: Props) => {
  const imgRef = useRef<any>(null)

  const { loading, imgUrl, getImage } = useImageUpload()

  const [name, setName] = useState<string | null>(null)
  const [cuisine, setCuisine] = useState<string | null>(null)
  const [deliveryPrice, setDeliveryPrice] = useState<number | null>(null)
  const [deliveryMin, setDeliveryMin] = useState<number | null>(null)
  const [address, setAddress] = useState<string | null>(null)
  const [category, setCategory] = useState<string | null>(null)
  const img = imgUrl

  const queryClient = useQueryClient()
  const toast = useToast()
  const { t } = useTranslation('admin')

  async function addRestaurant() {
    const form = {
      name: name,
      cuisine: cuisine,
      delivery_price: deliveryPrice,
      delivery_min: deliveryMin,
      address: address,
      category_id: category,
      img_url: img,
    }

    console.log(form, 'form')

    mutate(form)
  }

  const { mutate } = useMutation({
    mutationFn: postRestuarant,
    onSuccess: () => {
      toast({
        title: 'Restaurant added',
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
              <>
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
              </>
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
            onClick={addRestaurant}
            className="text-admin-white bg-admin-modal-purple-btn w-1/2 rounded-2xl font-display"
            text={t('Create Restaurant')}
          />
        </div>
      </div>
    </div>
  )
}

export default AdminAddModalRest
