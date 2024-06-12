import React, { useEffect, useRef, useState } from 'react'
import { IoClose } from 'react-icons/io5'
import AdminModalButton from '../adminModalButton'
import { useTranslation } from 'react-i18next'
import { FormControl, Text, useToast } from '@chakra-ui/react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import { useImageUpload } from '@/shared/hooks/useImageUpload'
import { getProductById, postProduct } from '@/shared/services/products'
import AdminModalDropdown from '../adminModalDropdown'
import AdminModalTextArea from '../adminModalText'
import { useRouter } from 'next/router'
import {
  getRestuarantById,
  getRestuarants,
} from '@/shared/services/restaurants'
import AdminModalUploadImage from '../adminModalUploadImage'
import { updateCategory } from '@/shared/services/category'
import { QUERY } from '@/shared/constants/query'
import { useCORP } from '@/shared/hooks/useCORP'
import AdminAsideModal from '../../layout/adminAsideModal'

interface Props {
  show?: boolean
  onClickClose?: any
  text: string
}
const AdminUpdateModalProduct = ({
  show = true,
  onClickClose,
  text,
}: Props) => {
  const { t } = useTranslation('admin')
  const toast = useToast()
  const { query } = useRouter()
  const queryClient = useQueryClient()

  const { data } = useQuery({
    queryFn: () => getProductById(query.id as string),
    queryKey: ['products', query.id],
  })
  // console.log(data, 'product')

  let initUrl = data?.data?.result?.data?.img_url

  const { loading, imgUrl, getImage } = useImageUpload(initUrl)

  const nameRef = useRef<any>(null)
  const descriptionRef = useRef<any>(null)
  const priceRef = useRef<any>(null)
  const [restId, setRestId] = useState<string | null>('')
  const imgRef = useRef<any>(null)

  console.log(nameRef?.current?.value, 'descriptionRef')

  useEffect(() => {
    if (data) {
      nameRef.current.value = data?.data.result.data.name
      descriptionRef.current.value = data?.data.result.data.description
      priceRef.current.value = data?.data.result.data.price
      setRestId(data?.data.result.data.rest_id)
    }
  }, [query.id, data])

  async function updateProduct() {
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
    console.log(form, 'formformform')

    mutate({ id: query?.id, data: form })

    nameRef.current.value = ''
    descriptionRef.current.value = ''
    priceRef.current.value = ''
  }

  const { mutate } = useCORP({
    queryFn: updateCategory,
    queryKey: [QUERY.PRODUCTS],
    toastText: 'Product updated',
    onClickClose: () => onClickClose(),
  })

  return (
    <AdminAsideModal
      show={show}
      onClickClose={onClickClose}
      handleEvent={updateProduct}
      handleEventText="Update Product"
    >
      <div>
        <p className="text-2xl text-admin-text font-medium mb-8 ">{text}</p>
      </div>
      <div className=" flex flex-col  w-full lg:flex-row mb-16 ">
        <div className=" w-full h-36 lg:w-1/3 ">
          <p className="font-medium text-lg text-admin-text">
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
        {/* <div className=" w-full lg:w-2/3 h-38 ">
            <div className="  bg-admin-modal-frame-bg h-full flex rounded-2xl items-center justify-center ">
              <div className=" relative ">
                <label htmlFor="img_url">
                  <IoMdCloudUpload className=" h-10 w-14 cursor-pointer fill-admin-modal-upload-icon" />{' '}
                  <Text className="text-white text-lg">Upload</Text>
                </label>
                <input
                  id="img_url"
                  name="img_url"
                  type="file"
                  src={imgUrl}
                  onChange={getImage}
                  className=" cursor-pointer absolute opacity-0 w-full h-full  font-display"
                />
              </div>
            </div>
          </div> */}
        <div className="w-full lg:w-2/3 h-38">
          <AdminModalUploadImage onChange={getImage} />
        </div>
      </div>
      <div className="flex   flex-col  lg:flex-row  w-full  mb-10 ">
        <div className="w-full lg:w-1/3 ">
          <p className="  font-medium text-admin-text  tracking-wide capitalize text-lg  font-display ">
            {t('Add your Product description and necessary information')}
          </p>
        </div>
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
                type="text"
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
      </div>
    </AdminAsideModal>
  )
}

export default AdminUpdateModalProduct