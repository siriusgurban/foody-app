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
    <div
      className={` fixed  z-10  w-full sm:w-3/4   sm:pl-10 ${
        show ? ' -right-full' : 'right-0'
      }  h-screen   top-0 transition-all duration-700`}
    >
      <button
        onClick={onClickClose}
        className="  rounded-full  bg-admin-modal-upload-icon  absolute  right-5 sm:left-0  top-7 w-7 h-7 cursor-pointer"
      >
        <IoClose className=" fill-admin-white h-4 w-6 pl-1" />
      </button>

      <div className="  bg-admin-main   flex-col pl-7 pt-3 pb-5 pr-7 lg:pr-14  max-h-screen  overflow-y-auto">
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
          <div className=" w-full lg:w-2/3 h-38 ">
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
        </div>
        <div className="flex justify-around  border-t-2   border-t-admin-cancel-btn pt-6  border-admin-main gap-10">
          <AdminModalButton
            onClick={onClickClose}
            className="  text-admin-white bg-admin-cancel-btn py-3 w-1/2 rounded-2xl font-display"
            text={t('Cancel')}
          />
          <AdminModalButton
            className=" text-admin-white bg-admin-modal-purple-btn w-1/2 rounded-2xl font-display"
            text={t(`Create Category`)}
            onClick={addProduct}
          />
        </div>
      </div>
    </div>
  )
}

export default AdminAddModalProduct
