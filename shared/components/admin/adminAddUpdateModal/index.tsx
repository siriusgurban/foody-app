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

interface Props {
  show?: boolean
  onClickClose?: () => void
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
  const { mutate } = useMutation({
    mutationFn: AddOffers,
    onSuccess(data) {
      console.log(data, 'success')
      toast({
        title: 'Offer added',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    },
    onError(error) {
      console.log(error, 'error')
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['offers'] })
    },
  })
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const selectedFile = files[0]
      setAddProductImage(URL.createObjectURL(selectedFile))

      const newUUID = nanoid()
      const imageRef = ref(fileStorage, `images/${selectedFile.name + newUUID}`)

      uploadBytes(imageRef, selectedFile)
        .then((snapshot) => {
          getDownloadURL(snapshot.ref)
            .then((downloadURL) => {
              setLastProductImage(downloadURL)
              //   console.log("Success", downloadURL);
            })
            .catch((error) => {
              // console.log("Error getting download URL", error);
            })
        })
        .catch((error) => {
          //   console.log("Error uploading file", error);
        })

      // console.log("File name:", selectedFile.name);
      //  console.log("add:", lastProductImage);
    }
  }
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
      img_url: lastProductImage,
    }
    mutate(newData)

    if (refInput.current) refInput.current.value = ''
    if (descriptionRef.current) descriptionRef.current.value = ''

    setText1('')
    setText2('')
    setLastProductImage(null)
  }

  return (
    <div
      className={`fixed z-10 w-full sm:w-3/4 sm:pl-10 ${
        show ? '-right-full' : 'right-0'
      } h-screen top-0 transition-all duration-700`}
    >
      <button
        onClick={onClickClose}
        className="rounded-full bg-admin-modal-upload-icon absolute right-5 sm:left-0 top-7 w-7 h-7 cursor-pointer"
      >
        <IoClose className="fill-admin-white h-4 w-6 pl-1" />
      </button>

      <div className="bg-admin-main flex-col pl-7 pt-3 pb-5 pr-7 lg:pr-14 max-h-screen overflow-y-auto">
        <div>
          <p className="text-2xl text-admin-text font-medium mb-8 ">{text}</p>
        </div>
        <div className=" flex flex-col  w-full lg:flex-row mb-16 ">
          <div className=" w-full h-36 lg:w-1/3 ">
            <p className="font-medium text-lg text-admin-text mb-3">
              {t('Upload  Image')}
            </p>
            {lastProductImage && (
              <img src={lastProductImage} width={138} height={132} alt="" />
            )}
          </div>
          <div className=" w-full lg:w-2/3 h-38 ">
            <AdminModalUploadImage onChange={handleFileChange} />{' '}
          </div>
        </div>
        <div className="flex flex-col lg:flex-row w-full mb-[170px]">
          <div className="w-full lg:w-1/3">
            <p className="font-medium text-admin-text tracking-wide capitalize text-lg font-display">
              {t('Add Your Category Information')}
            </p>
          </div>
          <div className="bg-admin-modal-frame-bg w-full lg:w-2/3 py-5 pl-5 pr-7 rounded-2xl max-h-[390px] overflow-y-scroll scrollbar">
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
        </div>
        <div className="flex justify-around border-t-2 border-t-admin-cancel-btn pt-6 border-admin-main gap-10">
          <AdminModalButton
            onClick={onClickClose}
            className="text-admin-white bg-admin-cancel-btn py-3 w-1/2 rounded-2xl font-display"
            text={t('Cancel')}
          />
          <AdminModalButton
            className="text-admin-white bg-admin-modal-purple-btn w-1/2 rounded-2xl font-display"
            text={t('Create Offer')}
            onClick={AddOffer}
          />
        </div>
      </div>
    </div>
  )
}

export default AdminAddOfferModal
