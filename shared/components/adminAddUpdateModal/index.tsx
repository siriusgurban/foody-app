import React, { useState } from 'react'
import AdminModalUploadImage from '../adminModalUploadImage';
import AdminModalInput from '../adminModalInput';
import AdminModalTextArea from '../adminModalText';
import AdminModalDropdown from '../adminModalDropdown';
import { IoClose } from "react-icons/io5";
import AdminModalButton from '../adminModalButton';
import { useTranslation } from 'react-i18next';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { nanoid } from "nanoid";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { fileStorage } from "../../../server/configs/firebase";
import { AddOffers } from '@/shared/services/offers';
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import { Toast } from '@chakra-ui/react';

// 
interface Props {
    show?: boolean;
    onClickClose?: () => void;
    text: string;
}

// 
const AdminAddUpdateModal = ({ show = true, onClickClose, text }: Props) => {
    const [addProductImage, setAddProductImage] = useState<string | null>(null);
    const [lastProductImage, setLastProductImage] = useState<string | null>(null);
    const [text1, setText1] = useState<string | null>(null);
    const [text2, setText2] = useState<string | null>(null);
    const queryClient = useQueryClient()

    const { t } = useTranslation('admin')
    const { pathname } = useRouter()
    const isTrue = pathname == "/admin/offers"
    //  console.log("a", isTrue)
    const { mutate } = useMutation({
        mutationFn: AddOffers,
        onSuccess(data, variables, context) {
           // console.log(data, 'success')
            Toast({
                title: 'offers added',
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
        },
        onError(data, variables, context) {
          //  console.log(data, 'error')
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['offers'] })
        },
    })
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const selectedFile = files[0];
            setAddProductImage(URL.createObjectURL(selectedFile));

            const newUUID = nanoid();
            const imageRef = ref(fileStorage, `images/${selectedFile.name + newUUID}`);

            uploadBytes(imageRef, selectedFile)
                .then((snapshot) => {
                    getDownloadURL(snapshot.ref)
                        .then((downloadURL) => {
                            setLastProductImage(downloadURL);
                            //   console.log("Success", downloadURL);
                        })
                        .catch((error) => {
                            // console.log("Error getting download URL", error);
                        });
                })
                .catch((error) => {
                    //   console.log("Error uploading file", error);
                });

            // console.log("File name:", selectedFile.name);
            //  console.log("add:", lastProductImage);

        }


    };
    const getInputValue = (text: string) => {
        setText1(text);
    };

    const getTextAreaInput = (text: string) => {
        setText2(text);
    };



    const handleSubmit = () => {
   //     console.log("hell")
        const newData = {
            name: text1,
            description: text2,
            img_url: lastProductImage,
        };
        mutate(newData);
    }


    return (
        <div className={` fixed  z-10  w-full sm:w-3/4   sm:pl-10 ${show ? " -right-full" : "right-0"}  h-screen  top-0 transition-all duration-700`}>
            <button
                onClick={onClickClose}
                className="  rounded-full  bg-admin-modal-upload-icon  absolute  right-5 sm:left-0  top-7 w-7 h-7 cursor-pointer">
                <IoClose className=' fill-admin-white h-4 w-6 pl-1' />
            </button>
            <div className="  bg-admin-main   flex-col pl-7 pt-3 pb-5 pr-7 lg:pr-14  max-h-screen  overflow-y-auto">
                <div>
                    <p className="text-2xl text-admin-text font-medium mb-8 ">{text}</p>
                </div>
                <div className=" flex flex-col  w-full lg:flex-row mb-16 ">
                    <div className=" w-full h-36 lg:w-1/3 ">
                        <p className="font-medium text-lg text-admin-text mb-3">
                            {t('Upload  Image')}
                        </p>
                        {lastProductImage && <img
                            src={lastProductImage}
                            width={138}
                            height={132}
                            alt=""
                        />}
                    </div>
                    <div className=" w-full lg:w-2/3 h-38 ">
                        <AdminModalUploadImage onChange={handleFileChange} />                    </div>
                </div>
                <div className="flex   flex-col   lg:flex-row  w-full  mb-10 ">
                    <div className="w-full lg:w-1/3 ">
                        <p className="  font-medium text-admin-text  tracking-wide capitalize text-lg  font-display ">
                            {t(`Add Your ${isTrue ? "Offer" : "Restuarants"} Information`)}
                        </p>
                    </div>
                    <div className="  bg-admin-modal-frame-bg w-full lg:w-2/3  pt-5 pl-5  pr-7   rounded-2xl max-h-[390px] overflow-y-scroll scrollbar " >
                        <div>
                            {isTrue && <>

                                <AdminModalInput p={t('Title')} className2='flex flex-col gap-2 ' placeHolder='Do you like Pizza at Papa John’s?' getText={getInputValue} />
                                <AdminModalTextArea p={t('Description')} className=' mt-6 mb-3' placeHolder="Yes you like pizza,Yummy" getText={getTextAreaInput} />

                            </>}

                            {!isTrue && <>
                                <AdminModalInput p={t('Name')} className2='flex flex-col gap-2 ' placeHolder='Mc Donald’s' getText={getInputValue} />
                                <AdminModalTextArea p={t('Cuisine')} className=' mt-6' placeHolder="Fast Food , Drink, Ice Cream, Sea Food" />
                                <AdminModalInput type="number" p={t('Delivery Price $')} className2='flex flex-col gap-2 mt-8' placeHolder='5' getText={getInputValue} />
                                <AdminModalInput type="number" p={t('Delivery  Min')} className2='flex flex-col gap-2 mt-6' placeHolder='11' />
                                <AdminModalInput p={t('Address')} className2='flex flex-col gap-2  mt-4 ' placeHolder='Nizami street 45 Baku Azerbaijan' />
                                <AdminModalDropdown p={t('Category')} className='mt-4 mb-2 placeholder' classNameSelect=" bg-admin-input w-full   text-admin-text rounded-2xl   pl-3 font-medium text-base py-4 font-display" />

                            </>
                            }
                        </div>
                    </div>
                </div>
                <div className="flex justify-around  border-t-2   border-t-admin-cancel-btn pt-6  border-admin-main gap-10">
                <AdminModalButton onClick={onClickClose} className="text-admin-white bg-admin-cancel-btn py-3 w-1/2 rounded-2xl font-display" text={t('Cancel')} />
                    {!isTrue && <AdminModalButton className="text-admin-white bg-admin-modal-purple-btn w-1/2 rounded-2xl font-display" text={t('Create Restaurant')} />}
                  {isTrue && <button className="text-admin-white bg-admin-modal-purple-btn w-1/2 rounded-2xl font-display" onClick={handleSubmit}>Add Offer</button>   }               </div>
            </div>
        </div>
    )
}

export default AdminAddUpdateModal