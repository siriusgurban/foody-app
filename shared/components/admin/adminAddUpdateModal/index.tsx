import React, { useRef, useState } from 'react'
import { IoClose } from 'react-icons/io5'
import AdminModalButton from '../adminModalButton'
import { useTranslation } from 'react-i18next'
import { FormControl, Text, useToast } from '@chakra-ui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AddOffers } from '@/shared/services/offers'
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage'
import { nanoid } from '@reduxjs/toolkit'
import { fileStorage } from '@/server/configs/firebase'
import AdminModalUploadImage from '../adminModalUploadImage'
import { QUERY } from '@/shared/constants/query'
import AdminAsideModal from '../../layout/adminAsideModal'
import { useImageUpload } from '@/shared/hooks/useImageUpload'
import { useCORP } from '@/shared/hooks/useCORP'

interface Props {
  show?: boolean
  onClickClose?: any
  text: string
}

const AdminAddOfferModal = ({ show = true, onClickClose, text }: Props) => {
  const { t } = useTranslation('admin')
  const toast = useToast()
  const queryClient = useQueryClient()

  const descriptionRef = useRef<HTMLTextAreaElement>(null)
  const imgRef = useRef<any>(null)
  const refInput = useRef<HTMLInputElement>(null)
  const [text1, setText1] = useState<string | null>(null)
  const [text2, setText2] = useState<string | null>(null)
  const [addProductImage, setAddProductImage] = useState<string | null>(null)
  const [lastProductImage, setLastProductImage] = useState<string | null>(null)
  const { mutate } = useCORP({
    queryFn: AddOffers,
    queryKey: [QUERY.OFFER],
    toastText: 'Offer added',
    onClickClose: () => onClickClose(),
  })
  const { loading, imgUrl, getImage } = useImageUpload()

  const handleBlur = () => {
    if (refInput.current) {
      setText1(refInput.current.value)
    }
  }

  const handleTextAreaBlur = () => {
    if (descriptionRef.current) {
      setText2(descriptionRef.current.value)
    }
  }

  const AddOffer = () => {
    console.log('hell')
    console.log('text1', text1)
    console.log('text2', text2)
    console.log('lastProductImage', lastProductImage)

    const newData = {
      name: text1,
      description: text2,
      img_url: imgUrl,
    }

    console.log(newData, 'newData')

    mutate(newData)

    if (refInput.current) refInput.current.value = ''
    if (descriptionRef.current) descriptionRef.current.value = ''

    setText1('')
    setText2('')
    setLastProductImage(null)
  }

  return (
    <AdminAsideModal
      show={show}
      onClickClose={onClickClose}
      handleEvent={AddOffer}
      handleEventText="Add Offer"
      text={text}
      imgRef={imgRef}
      loading={loading}
      imgUrl={imgUrl}
      getImage={getImage}
      modalText="Add Your Offer Information"
    >
      <div className="bg-admin-modal-frame-bg w-full lg:w-2/3 py-5 pl-5 pr-7 rounded-2xl max-h-[390px] overflow-y-scroll scrollbar mb-[42px]">
        <FormControl className="p-0">
          <div className="flex flex-col gap-2">
            <p className="font-medium text-admin-text text-base font-display">
              {t('Name')}
            </p>
            <input
              type="text"
              className="rounded-2xl text-whiteLight font-medium text-base bg-admin-input text-admin-modal-placeholder pl-5 py-3 capitalize font-display"
              ref={refInput}
              onBlur={handleBlur}
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="mt-6 mb-3">
              <p className="text-admin-text font-medium mb-2 text-base font-display">
                Description
              </p>
              <textarea
                className="w-full rounded-2xl h-24 font-medium text-base text-admin-modal-placeholder pt-2 pl-4 bg-admin-input capitalize font-display"
                ref={descriptionRef}
                onBlur={handleTextAreaBlur}
              ></textarea>
            </div>
          </div>
        </FormControl>
      </div>
    </AdminAsideModal>
  )
}

export default AdminAddOfferModal
