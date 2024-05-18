//@ts-nocheck

import React, { useEffect } from 'react'
import AdminModalUploadImage from '../adminModalUploadImage'
import AdminModalInput from '../adminModalInput'
import AdminModalTextArea from '../adminModalText'
import AdminModalDropdown from '../adminModalDropdown'
import { IoClose } from 'react-icons/io5'
import AdminModalButton from '../adminModalButton'
import { useTranslation } from 'react-i18next'
import { FormControl, FormHelperText, useToast } from '@chakra-ui/react'
import { useFormik } from 'formik'
import {
  getCategoryById,
  postCategory,
  updateCategory,
} from '@/shared/services/category'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'

//
interface Props {
  show?: boolean
  onClickClose?: () => void
  text: string
}

const initialValues = {
  name: '',
  slug: '',
  img_url:
    'https://gujarat.mallsmarket.com/sites/default/files/styles/medium/public/images/brands/McDonalds-Logo.jpg',
}

//
const AdminAddUpdateModalCategory = ({
  show = true,
  onClickClose,
  text,
}: Props) => {
  const { t } = useTranslation('admin')
  const toast = useToast()
  const queryClient = useQueryClient()

  const { push, query } = useRouter()
  console.log(query.id, 'urlllllllllll')

  const { values, handleChange, handleSubmit, errors, resetForm } = useFormik({
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

  async function handleForm(data: any, id: string) {
    // try {
    //   const res = await postCategory(data)
    //   console.log(res, 'res')

    //   toast({
    //     description: "You've entered",
    //     status: 'success',
    //     duration: 3000,
    //     isClosable: true,
    //     position: 'top-right',
    //   })
    // } catch (error) {
    //   toast({
    //     description: error.message,
    //     status: 'error',
    //     duration: 3000,
    //     isClosable: true,
    //     position: 'top-right',
    //   })
    // }
    id == null ? mutate(data) : mutate(id, data)
  }

  const { mutate } = useMutation({
    mutationFn: query.id ? postCategory : updateCategory,
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

  const { data: category } = useQuery({
    queryFn: () => getCategoryById(query?.id),
    queryKey: ['category'],
  })

  console.log(values, 'values')

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
              {t('Upload  Image')}
            </p>
            {/* <img
                    width={118}
                    height={122}
                    alt=""
                /> */}
          </div>
          <div className=" w-full lg:w-2/3 h-38 ">
            <AdminModalUploadImage />
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
                  value={
                    query?.id
                      ? values?.name
                      : category?.data?.result?.data[0].name
                  }
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
                  value={
                    query?.id
                      ? values?.slug
                      : category?.data?.result?.data[0].slug
                  }
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
            text={t(`${query.id ? 'Update' : 'Create'} Category`)}
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  )
}

export default AdminAddUpdateModalCategory
