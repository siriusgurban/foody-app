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
import AdminModalUploadImage from '../adminModalUploadImage'
import { useCORP } from '@/shared/hooks/useCORP'
import { QUERY } from '@/shared/constants/query'
import AdminAsideModal from '../../layout/adminAsideModal'

interface Props {
  show?: boolean
  onClickClose?: any
  text: string
}
const AdminAddModalCategory = ({ show = true, onClickClose, text }: Props) => {
  const { t } = useTranslation('admin')
  const toast = useToast()
  const queryClient = useQueryClient()

  const nameRef = useRef<any>('')
  const imgRef = useRef<any>(null)

  async function addCategory() {
    const category = nameRef?.current?.value
    const img = imgUrl

    const form = {
      name: category,
      img_url: img,
    }
    mutate(form)

    nameRef.current.value = ''
  }

  const { mutate } = useCORP({
    queryFn: postCategory,
    queryKey: [QUERY.CATEGORIES],
    toastText: 'Category added',
    onClickClose: () => onClickClose(),
  })

  const { loading, imgUrl, getImage } = useImageUpload()

  return (
    <AdminAsideModal
      show={show}
      onClickClose={onClickClose}
      handleEvent={addCategory}
      handleEventText="Add Category"
      text={text}
      imgRef={imgRef}
      loading={loading}
      imgUrl={imgUrl}
      getImage={getImage}
      modalText="Add Your Category Information"
    >
      <div className="bg-admin-modal-frame-bg w-full lg:w-2/3  py-5 pl-5  pr-7 rounded-2xl max-h-[390px] overflow-y-scroll scrollbar mb-[210px]">
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
        </FormControl>
      </div>
    </AdminAsideModal>
  )
}

export default AdminAddModalCategory
