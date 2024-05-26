import React from 'react'
import AdminModalUploadImage from '../adminModalUploadImage';
import AdminModalInput from '../adminModalInput';
import AdminModalTextArea from '../adminModalText';
import AdminModalDropdown from '../adminModalDropdown';
import { IoClose } from "react-icons/io5";
import AdminModalButton from '../adminModalButton';
import { useTranslation } from 'react-i18next';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/router';

// 
interface Props {
    show?: boolean;
    onClickClose?: () => void;
    text: string;
}

// 
const AdminAddUpdateModal = ({ show = true, onClickClose, text }: Props) => {
    const { t } = useTranslation('admin')
    const { pathname } = useRouter()
    const isTrue = pathname == "/admin/offers"
    console.log("a", isTrue)
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
                            {t(`Add Your ${isTrue ? "Offer" : "Restuarants"} Information`)}
                        </p>
                    </div>
                    <div className="  bg-admin-modal-frame-bg w-full lg:w-2/3  pt-5 pl-5  pr-7   rounded-2xl max-h-[390px] overflow-y-scroll scrollbar " >
                        <div>
                            {isTrue && <>

                                <AdminModalInput p={t('Title')} className2='flex flex-col gap-2 ' placeHolder='Do you like Pizza at Papa John’s?' />
                                <AdminModalTextArea p={t('Description')} className=' mt-6 mb-3' placeHolder="Yes you like pizza,Yummy" />

                            </>}

                            {!isTrue && <>
                                <AdminModalInput p={t('Name')} className2='flex flex-col gap-2 ' placeHolder='Mc Donald’s' />
                                <AdminModalTextArea p={t('Cuisine')} className=' mt-6' placeHolder="Fast Food , Drink, Ice Cream, Sea Food" />
                                <AdminModalInput type="number" p={t('Delivery Price $')} className2='flex flex-col gap-2 mt-8' placeHolder='5' />
                                <AdminModalInput type="number" p={t('Delivery  Min')} className2='flex flex-col gap-2 mt-6' placeHolder='11' />
                                <AdminModalInput p={t('Address')} className2='flex flex-col gap-2  mt-4 ' placeHolder='Nizami street 45 Baku Azerbaijan' />
                                <AdminModalDropdown p={t('Category')} className='mt-4 mb-2 placeholder' classNameSelect=" bg-admin-input w-full   text-admin-text rounded-2xl   pl-3 font-medium text-base py-4 font-display" />

                            </>
                            }
                        </div>
                    </div>
                </div>
                <div className="flex justify-around  border-t-2   border-t-admin-cancel-btn pt-6  border-admin-main gap-10">
                    <AdminModalButton onClick={onClickClose} className="  text-admin-white bg-admin-cancel-btn py-3 w-1/2 rounded-2xl font-display" text={t('Cancel')} />
                    <AdminModalButton className=" text-admin-white bg-admin-modal-purple-btn w-1/2 rounded-2xl font-display" text={t(`Create ${isTrue ? "Offer" : "Restaurant"} `)} />
                </div>
            </div>
        </div>
    )
}

export default AdminAddUpdateModal