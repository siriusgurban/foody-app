import React from 'react'
import AdminModalUploadImage from '../adminModalUploadImage';
import AdminModalInput from '../adminModalInput';
import AdminModalTextArea from '../adminModalText';
import AdminModalDropdown from '../adminModalDropdown';
import { IoClose } from "react-icons/io5";
import AdminModalButton from '../adminModalButton';

// 
interface Props {
    show?: boolean;
    onClickClose?: () => void;
    text: string;
}

// 
const AdminAddUpdateModal = ({ show = true, onClickClose, text }: Props) => {
    return (
        <div className={` fixed  z-10  w-full sm:w-3/4   sm:pl-10 ${show ? " -right-full" : "right-0"}   top-0 transition-all duration-700`}>
            <button
                onClick={onClickClose}
                className="  rounded-full  bg-admin-modal-upload-icon  absolute  right-5 sm:left-0  top-7 w-7 h-7 cursor-pointer">
                <IoClose className=' fill-admin-white h-4 w-6 pl-1' />
            </button>
            <div className="  bg-admin-main   flex-col pl-7 pt-3 pb-5 pr-7 lg:pr-14  max-h-screen   overflow-y-auto h-screen">
                <div>
                    <p className="text-2xl text-admin-text font-medium mb-8  font-display">{text}</p>
                </div>
                <div className=" flex flex-col  w-full lg:flex-row mb-16">
                    <div className=" w-full h-32 lg:w-1/3 ">
                        <p className="font-medium text-lg text-admin-text  tracking-wider font-display mt-6">
                            Upload Your Image
                        </p>
                        {/* <img
                            width={118}
                            height={122}
                            alt=""
                        /> */}
                    </div>
                    <div className=" w-full lg:w-2/3  pt-8 h-38 ">
                        <AdminModalUploadImage />
                    </div>
                </div>
                <div className="flex   flex-col   lg:flex-row  w-full mb-36 ">
                    <div className="w-full lg:w-1/3 ">
                        <p className="  font-medium text-admin-text  tracking-wide capitalize text-lg  font-display ">
                            add your restaurant restaurant
                        </p>
                    </div>
                    <div className="  bg-admin-modal-frame-bg w-full lg:w-2/3  pt-5 pl-5  pr-7 pb-7  rounded-2xl max-h-[610px] overflow-y-auto ">
                        <div>
                            <AdminModalInput p="Name" className2='flex flex-col gap-2 ' />
                            <AdminModalTextArea p="Cuisine" className=' mt-6' />
                            <AdminModalInput type="number" p="Delivery Price $" className2='flex flex-col gap-2 mt-8' />
                            <AdminModalInput type="number" p="Delivery Min" className2='flex flex-col gap-2 mt-6' />
                            <AdminModalInput p="Address" className2='flex flex-col gap-2  mt-4 ' />
                            <AdminModalDropdown p="Category" className='mt-4 placeholder' />
                        </div>
                    </div>
                </div>
                <div className="flex justify-around  border-t-4 pt-6  border-admin-main gap-10">
                    <AdminModalButton onClick={onClickClose} className="  text-admin-white bg-admin-cancel-btn py-3 w-1/2 rounded-2xl font-display" text="Cancel" />
                    <AdminModalButton className=" text-admin-white bg-admin-modal-purple-btn w-1/2 rounded-2xl font-display" text=" Create Restaurant" />
                </div>
            </div>
        </div>
    )
}

export default AdminAddUpdateModal