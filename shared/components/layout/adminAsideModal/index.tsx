import React, { useEffect, useRef, useState } from 'react'
import { IoClose } from 'react-icons/io5'
import AdminModalButton from '../../admin/adminModalButton'
import { useTranslation } from 'react-i18next'
import { FormControl } from '@chakra-ui/react'
import { getCategoryById, updateCategory } from '@/shared/services/category'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useImageUpload } from '@/shared/hooks/useImageUpload'
import AdminModalUploadImage from '../../admin/adminModalUploadImage'
import { QUERY } from '@/shared/constants/query'
import { useCORP } from '@/shared/hooks/useCORP'

interface Props {
  show?: boolean
  onClickClose: any
  handleEvent: any
  children?: any
  handleEventText: string
}

const AdminAsideModal = ({
  children,
  show,
  onClickClose,
  handleEvent,
  handleEventText,
}: Props) => {
  const { t } = useTranslation('admin')
  const { query } = useRouter()

  return (
    <div>
      <div
        className={` fixed opacity-50 bg-black z-10  w-full sm:w-1/3   sm:pl-10 ${
          show ? ' -left-full ' : 'left-0'
        }  h-screen  top-0 transition-all duration-700`}
      ></div>
      <div
        className={` fixed  z-10  w-full sm:w-3/4   sm:pl-10 ${
          show ? ' -right-full ' : 'right-0'
        }  h-screen top-0 transition-all duration-700`}
      >
        <button
          onClick={onClickClose}
          className="rounded-full bg-admin-modal-upload-icon absolute right-5 sm:left-0 top-7 w-7 h-7 cursor-pointer"
        >
          <IoClose className=" fill-admin-white h-4 w-6 pl-1" />
        </button>
        <div className="bg-admin-main flex-col pl-7 pt-3 pb-5 pr-7 lg:pr-14 max-h-screen overflow-y-auto">
          {children}
          <div className="flex justify-around  border-t-2   border-t-admin-cancel-btn pt-6  border-admin-main gap-10">
            <AdminModalButton
              onClick={onClickClose}
              className="  text-admin-white bg-admin-cancel-btn py-3 w-1/2 rounded-2xl font-display"
              text={t('Cancel')}
            />
            <AdminModalButton
              className=" text-admin-white bg-admin-modal-purple-btn w-1/2 rounded-2xl font-display"
              text={t(handleEventText)}
              onClick={handleEvent}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminAsideModal
