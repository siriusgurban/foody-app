import React from 'react'
import { IoClose } from 'react-icons/io5'
import AdminModalButton from '../../admin/adminModalButton'
import { useTranslation } from 'react-i18next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import AdminModalUploadImage from '../../admin/adminModalUploadImage'

interface Props {
  show?: boolean
  onClickClose: any
  handleEvent: any
  children?: any
  handleEventText: string
  text: string
  imgRef: any
  loading: boolean
  imgUrl: string
  getImage: any
  modalText: string
}

const AdminAsideModal = ({
  children,
  show,
  onClickClose,
  handleEvent,
  handleEventText,
  text,
  imgRef,
  loading,
  imgUrl,
  getImage,
  modalText,
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
                  loading
                    ? '/loadingImage.png'
                    : imgUrl
                    ? imgUrl
                    : '/upload.png'
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
                {t(modalText)}
              </p>
            </div>
            {children}
          </div>
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
