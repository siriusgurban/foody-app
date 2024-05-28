import React, { useEffect, useRef, useState } from 'react'
import { IoClose } from 'react-icons/io5'
import AdminModalButton from '../adminModalButton'
import { useTranslation } from 'react-i18next'
import { FormControl, useToast } from '@chakra-ui/react'
import { postRestuarant } from '@/shared/services/restaurants'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import { IoMdCloudUpload } from 'react-icons/io'
import { useImageUpload } from '@/shared/hooks/useImageUpload'

interface Props {
    show?: boolean
    onClickClose?: () => void
    text: string
}

const AdminAddModalRestaurant = ({ show = true, onClickClose, text }: Props) => {
    const { t } = useTranslation('admin')
    const toast = useToast()
    const queryClient = useQueryClient()

    const nameRef = useRef<HTMLInputElement>(null)
    const cuisineRef = useRef<HTMLInputElement>(null)
    const minRef = useRef<HTMLInputElement>(null)
    const priceRef = useRef<HTMLInputElement>(null)
    const addressRef = useRef<HTMLInputElement>(null)
    const categoryRef = useRef<HTMLInputElement>(null)

    async function addRestaurant() {
        const name = nameRef?.current?.value
        const cuisine = cuisineRef?.current?.value
        const delivery_min = minRef?.current?.value
        const delivery_price = priceRef?.current?.value
        const address = addressRef?.current?.value
        const category = categoryRef?.current?.value
        const img = imgUrl

        const form = {
            name,
            cuisine,
            delivery_min,
            delivery_price,
            address,
            category,
            img_url: img,
        }

        mutate(form)
    }

    const { mutate } = useMutation({
        mutationFn: postRestuarant,
        onSuccess(data, variables, context) {
            console.log(data, 'success')
            toast({
                title: 'Restaurant added',
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
        },
        onError(data, variables, context) {
            console.log(data, 'error')
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['restaurants'] })
        },
    })

    const { loading, imgUrl, getImage } = useImageUpload()

    return (
        <div
            className={`fixed z-10 w-full sm:w-3/4 sm:pl-10 ${show ? ' -right-full' : 'right-0'} h-screen top-0 transition-all duration-700`}
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
                <div className="flex flex-col w-full lg:flex-row mb-16">
                    <div className="w-full h-36 lg:w-1/3">
                        <p className="font-medium text-lg text-admin-text">{t('Upload Image')}</p>
                        <Image
                            width={138}
                            height={132}
                            alt="Upload"
                            src={`${loading ? '/loadingImage.png' : imgUrl ? imgUrl : '/upload.png'}`}
                        />
                    </div>
                    <div className="w-full lg:w-2/3 h-38">
                        <div className="bg-admin-modal-frame-bg h-full flex rounded-2xl items-center justify-center">
                            <div className="relative">
                                <label htmlFor="img_url">
                                    <IoMdCloudUpload className="h-10 w-14 cursor-pointer fill-admin-modal-upload-icon" />
                                </label>
                                <input
                                    id="img_url"
                                    name="img_url"
                                    type="file"
                                    src={imgUrl}
                                    onChange={getImage}
                                    className="cursor-pointer absolute opacity-0 w-full h-full font-display"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row w-full mb-10">
                    <div className="w-full lg:w-1/3">
                        <p className="font-medium text-admin-text tracking-wide capitalize text-lg font-display">
                            {t('Add Your Restaurant Information')}
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
                                    id="name"
                                    name="name"
                                    ref={nameRef}
                                    placeholder={t('Mc Donald’s')}
                                    className="rounded-2xl text-whiteLight font-medium text-base bg-admin-input text-admin-modal-placeholder pl-5 py-3 capitalize font-display"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="font-medium text-admin-text text-base font-display">
                                    {t('Cuisine')}
                                </p>
                                <input
                                    type="text"
                                    id="cuisine"
                                    name="cuisine"
                                    ref={cuisineRef}
                                    placeholder={t('Fast Food, Drink, Ice Cream, Sea Food')}
                                    className="rounded-2xl text-whiteLight font-medium text-base bg-admin-input text-admin-modal-placeholder pl-5 py-3 capitalize font-display"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="font-medium text-admin-text text-base font-display">
                                    {t('Delivery Price $')}
                                </p>
                                <input
                                    type="number"
                                    id="delivery_price"
                                    name="delivery_price"
                                    ref={priceRef}
                                    placeholder="5"
                                    className="rounded-2xl text-whiteLight font-medium text-base bg-admin-input text-admin-modal-placeholder pl-5 py-3 capitalize font-display"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="font-medium text-admin-text text-base font-display">
                                    {t('Delivery Min')}
                                </p>
                                <input
                                    type="number"
                                    id="delivery_min"
                                    name="delivery_min"
                                    ref={minRef}
                                    placeholder="11"
                                    className="rounded-2xl text-whiteLight font-medium text-base bg-admin-input text-admin-modal-placeholder pl-5 py-3 capitalize font-display"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="font-medium text-admin-text text-base font-display">
                                    {t('Address')}
                                </p>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    ref={addressRef}
                                    placeholder={t('Nizami street 45 Baku Azerbaijan')}
                                    className="rounded-2xl text-whiteLight font-medium text-base bg-admin-input text-admin-modal-placeholder pl-5 py-3 capitalize font-display"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="font-medium text-admin-text text-base font-display">
                                    {t('Category')}
                                </p>
                                <input
                                    type="text"
                                    id="category"
                                    name="category"
                                    ref={categoryRef}
                                    placeholder={t('Category')}
                                    className="rounded-2xl text-whiteLight font-medium text-base bg-admin-input text-admin-modal-placeholder pl-5 py-3 capitalize font-display"
                                />
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
                        text={t('Create Restaurant')}
                        onClick={addRestaurant}
                    />
                </div>
            </div>
        </div>
    )
}

export default AdminAddModalRestaurant
