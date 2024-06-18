import React, { useEffect, useRef, useState } from 'react'
import { IoClose } from 'react-icons/io5'
import AdminModalButton from '../adminModalButton'
import { useTranslation } from 'react-i18next'
import { FormControl } from '@chakra-ui/react'
import { getCategoryById, updateCategory } from '@/shared/services/category'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useImageUpload } from '@/shared/hooks/useImageUpload'
import AdminModalUploadImage from '../adminModalUploadImage'
import { QUERY } from '@/shared/constants/query'
import { useCORP } from '@/shared/hooks/useCORP'
import AdminModalInput from '../adminModalInput'
import AdminAsideModal from '../../layout/adminAsideModal'

interface Props {
  show?: boolean
  onClickClose?: any
  text: string
}

const AdminUpdateModalCategory = ({
  show = true,
  onClickClose,
  text,
}: Props) => {
  const { t } = useTranslation('admin')
  const { query } = useRouter()

  const { data } = useQuery({
    queryFn: () => getCategoryById(query.id as string),
    queryKey: [QUERY.CATEGORIES, query.id],
  })

  let nameRef = useRef<any>(null)
  const [state, setState] = useState<any>()
  let imgRef = useRef<any>()

  let initUrl = data?.data?.result?.data?.img_url

  const { loading, imgUrl, getImage } = useImageUpload(initUrl)

  useEffect(() => {
    if (data) {
      nameRef.current.value = data?.data.result.data.name
    }
  }, [query.id, data])

  const { mutate } = useCORP({
    queryFn: updateCategory,
    queryKey: [QUERY.CATEGORIES],
    toastText: 'Category updated',
    onClickClose: () => onClickClose(),
  })

  function handleCategory() {
    const name = nameRef?.current?.value
    const img = imgUrl

    const form = {
      name: name,
      img_url: img,
    }

    mutate({ id: query?.id, data: form })
  }

  return (
    <AdminAsideModal
      show={show}
      onClickClose={onClickClose}
      handleEvent={handleCategory}
      handleEventText="Update Category"
      text={text}
      imgRef={imgRef}
      loading={loading}
      imgUrl={imgUrl}
      getImage={getImage}
      modalText="Add Your Category Information"
    >
      <div className=" bg-admin-modal-frame-bg w-full lg:w-2/3 py-5 pl-5 pr-7 rounded-2xl max-h-[390px] overflow-y-scroll scrollbar mb-[210px]">
        <FormControl className="p-0 ">
          <div className="flex flex-col gap-2 ">
            {/* <AdminModalInput
                    ph={t('name')}
                    p={t('Name')}
                    type="text"
                    getText={setState}
                  ></AdminModalInput> */}
            <p className=" font-medium   text-admin-text  text-base font-display">
              {t('Name')}
            </p>
            <input
              type="text"
              id="name"
              name="name"
              ref={nameRef}
              // value={initName}
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

export default AdminUpdateModalCategory
