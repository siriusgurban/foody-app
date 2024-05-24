//@ts-nocheck

import React, { useEffect, useRef, useState } from 'react'
import AdminModalUploadImage from '../adminModalUploadImage'
import { IoClose } from 'react-icons/io5'
import AdminModalButton from '../adminModalButton'
import { useTranslation } from 'react-i18next'
import { FormControl, FormHelperText, Input, useToast } from '@chakra-ui/react'
import { useFormik } from 'formik'
import { postCategory } from '@/shared/services/category'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { fileStorage } from '../../../server/configs/firebase'
import Image from 'next/image'
import { IoMdCloudUpload } from 'react-icons/io'
import { ImageUpload } from '../imageUpload'
import ImageUploading from 'react-images-uploading'

interface Props {
  show?: boolean
  onClickClose?: () => void
  text: string
}

const initialValues = {
  name: '',
  slug: '',
  img_url: '',
  // 'https://gujarat.mallsmarket.com/sites/default/files/styles/medium/public/images/brands/McDonalds-Logo.jpg',
}

const AdminAddModalCategory = ({ show = true, onClickClose, text }: Props) => {
  const { t } = useTranslation('admin')
  const toast = useToast()
  const queryClient = useQueryClient()
  const { push, query } = useRouter()
  const [imgUrl, setImgUrl] = useState<any>(initialValues.img_url)
  const imgRef = useRef<any>(null)
  const [imgOnload, setImgOnload] = useState(false)

  const {
    values,
    handleChange,
    handleSubmit,
    errors,
    resetForm,
    setFieldValue,
  } = useFormik({
    initialValues,
    onSubmit: handleForm,
    validate: (form) => {
      const error: any = {}

      if (!form?.name?.trim()) {
        error.name = 'Require field'
      }
      if (!form?.slug?.trim()) {
        error.slug = 'Require field'
      }

      return error
    },
  })

  async function handleForm(data: any) {
    mutate(data)
  }

  const { mutate } = useMutation({
    mutationFn: postCategory,
    onSuccess(data, variables, context) {
      console.log(data, 'success')
      resetForm()
      toast({
        title: 'Category added',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    },
    onError(data, variables, context) {
      console.log(data, 'error')
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
  })

  console.log(values, 'values')

  const [images, setImages] = React.useState(initialValues.images)
  const maxNumber = 1

  const onChange = (imageList: any, addUpdateIndex: any) => {
    // data for submit
    console.log(imageList, addUpdateIndex)
    setImages(imageList)
  }

  // function getImage(e: React.ChangeEvent<HTMLInputElement>) {
  //   const name = e?.target?.files?.[0]?.name
  //   console.log(e?.target?.files?.[0]?.name, 'eeeeeeee')

  //   if (!name) {
  //     return
  //   }
  //   const imageRef = ref(fileStorage, `files/images/${name}`)

  //   const file = e?.target?.files?.[0]
  //   if (!file) {
  //     return
  //   }
  //   uploadBytes(imageRef, file).then((snapshot) => {
  //     setImgOnload(true)
  //     getDownloadURL(snapshot.ref).then((url) => {
  //       setImgOnload(false)
  //       setImgUrl(url)
  //       // getImgUrl(url)
  //     })
  //   })
  // }

  return (
    <div
      className={` fixed  z-10  w-full sm:w-3/4   sm:pl-10 ${
        show ? ' -right-full' : 'right-0'
      }  h-screen  top-0 transition-all duration-700`}
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
                imgOnload
                  ? '/loadingImage.png'
                  : imgUrl
                  ? imgUrl
                  : '/upload.png'
              }`}
            />
          </div>
          <div className=" w-full lg:w-2/3 h-38 ">
            {/* <AdminModalUploadImage /> */}
            <div className=" cursor-pointer bg-admin-modal-frame-bg h-full flex rounded-2xl items-center justify-center ">
              <div className=" relative ">
                <IoMdCloudUpload className=" h-10 w-14  fill-admin-modal-upload-icon" />

                <input
                  onChange={(e) => {
                    handleChange(e),
                      setFieldValue('img_url', e.target.files?.[0]?.name)
                  }}
                  value={values?.img_url}
                  id="img_url"
                  name="img_url"
                  type="file"
                  className=" cursor-pointer absolute opacity-0 w-full h-full  font-display"
                />
                {/* <ImageUploading
                  file
                  value={values?.img_url}
                  onChange={(e) => {
                    handleChange(e), onChange
                  }}
                  maxNumber={maxNumber}
                  dataURLKey="data_url"
                >
                  {({
                    imageList,
                    onImageUpload,
                    onImageUpdate,
                    onImageRemove,
                  }) => (
                    // write your building UI
                    <div className="upload__image-wrapper">
                      <IoMdCloudUpload className=" h-10 w-14  fill-admin-modal-upload-icon" />
                      <p
                        onClick={onImageUpload}
                        className=" text-admin-text font-medium text-lg font-display"
                      >
                        Upload
                      </p>
                      &nbsp;
                      {imageList.map((image, index) => (
                        <div key={index} className="image-item">
                          <img src={image['data_url']} alt="asd" width="100" />
                          <div className="image-item__btn-wrapper">
                            <button onClick={() => onImageUpdate(index)}>
                              Update
                            </button>
                            <button onClick={() => onImageRemove(index)}>
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </ImageUploading> */}
              </div>
            </div>
          </div>
        </div>
        <div className="flex   flex-col   lg:flex-row  w-full  mb-10 ">
          <div className="w-full lg:w-1/3 ">
            <p className="  font-medium text-admin-text  tracking-wide capitalize text-lg  font-display ">
              {t('Add Your Category Information')}
            </p>
          </div>
          <div className="  bg-admin-modal-frame-bg w-full lg:w-2/3  py-5 pl-5  pr-7   rounded-2xl max-h-[390px] overflow-y-scroll scrollbar ">
            <FormControl className="p-0">
              <div className="flex flex-col gap-2 ">
                <p className=" font-medium   text-admin-text  text-base font-display">
                  {t('Name')}
                </p>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={values?.name}
                  placeholder={t('name')}
                  onChange={handleChange}
                  className="rounded-2xl  text-whiteLight  font-medium text-base  bg-admin-input   text-admin-modal-placeholder pl-5 py-3  capitalize font-display"
                />
                {errors?.slug && (
                  <FormHelperText color="red">{errors?.name}</FormHelperText>
                )}
              </div>
              <div className="flex flex-col gap-2 ">
                <p className=" font-medium   text-admin-text  text-base font-display">
                  {t('Slug')}
                </p>
                <input
                  type="text"
                  id="slug"
                  name="slug"
                  value={values?.slug}
                  placeholder={t('slug')}
                  onChange={handleChange}
                  className="rounded-2xl  text-whiteLight  font-medium text-base  bg-admin-input   text-admin-modal-placeholder pl-5 py-3  capitalize font-display"
                />
                {errors?.slug && (
                  <FormHelperText color="red">{errors?.slug}</FormHelperText>
                )}
              </div>
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
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  )
}

export default AdminAddModalCategory
