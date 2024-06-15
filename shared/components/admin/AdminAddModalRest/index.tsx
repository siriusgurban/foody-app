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
import { getCategories } from '@/shared/services/category'
import { useCORP } from '@/shared/hooks/useCORP'
import { QUERY } from '@/shared/constants/query'
import AdminAsideModal from '../../layout/adminAsideModal'

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

  const { mutate } = useCORP({
    queryFn: postRestuarant,
    queryKey: [QUERY.RESTAURANTS],
    toastText: 'Restaurant added',
    onClickClose: () => onClickClose(),
  })

  return (
    <AdminAsideModal
      show={show}
      onClickClose={onClickClose}
      handleEvent={addRestaurant}
      handleEventText="Add Restaurant"
      text={text}
      imgRef={imgRef}
      loading={loading}
      imgUrl={imgUrl}
      getImage={getImage}
      modalText="Add Your Restaurant Information"
    >
      <div className="bg-admin-modal-frame-bg w-full lg:w-2/3 pt-5 pl-5 pr-7 rounded-2xl max-h-[390px] overflow-y-scroll scrollbar">
        <div>
          <>
            <AdminModalInput
              p={t('Name')}
              className2="flex flex-col gap-2"
              ph="Mc Donald’s"
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
              ph="5"
              getText={(text) => setDeliveryPrice(parseInt(text))}
            />
            <AdminModalInput
              type="number"
              p={t('Delivery Mi')}
              className2="flex flex-col gap-2 mt-6"
              ph="11"
              getText={(text) => setDeliveryMin(parseInt(text))}
            />
            <AdminModalInput
              p={t('Address')}
              className2="flex flex-col gap-2 mt-4"
              ph="Nizami street 45 Baku Azerbaijan"
              getText={setAddress}
            />
            <AdminModalDropdown
              p={t('Category')}
              className="mt-4 mb-2 placeholder"
              classNameSelect="bg-admin-input w-full text-admin-text rounded-2xl pl-3 font-medium text-base py-4 font-display"
              getText={setCategory}
              getData={getCategories}
              queryKey="categories"
            />
          </>
        </div>
      </div>
    </AdminAsideModal>
  )
}

export default AdminAddModalRest
