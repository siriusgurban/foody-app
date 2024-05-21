import React, { useState } from 'react'
// import { Lang } from '../Lang'
import Image from 'next/image'
import AdminModalButton from '../adminModalButton'
import HeaderUserList from '../headerUserList'

const ClientHeaderRightSideComponents = () => {
    const [showUserList, setShowUserList] = useState(false)

    const toggleUserList = () => {
        setShowUserList(!showUserList)

    }


    return (
        <div className='relative items-center gap-5  hidden sm:flex '>
            {/* <Lang /> */}
            {/* <div className='relative bg-client-login-mainColor   rounded-full   w-10 h-10  flex justify-center cursor-pointer  hover:scale-95 transition-all duration-500  '>
                <Image width={30} height={0} src='/basket.svg' alt='basket' className='   ' />
                <span className='flex justify-center items-center text-sm  w-4 h-4  text-client-main-red font-extrabold  absolute   left-8 top-[-1px]  z-10'>0</span>
            </div> */}
            <div className='relative bg-client-login-mainColor   rounded-full   w-10 h-10  flex justify-center cursor-pointer  hover:scale-95 transition-all duration-500  '>
                <Image width={30} height={0} src='/basket.svg' alt='basket' className='cursor-pointer hover:scale-95 transition-all duration-500   ' />
                <span className='text-white font-extrabold  w-4 h-4 flex justify-center items-center text-[12px] absolute right-[-4px] top-[-4px]     bg-client-login-mainColor z-10 rounded-full'>0</span>
            </div>
            <AdminModalButton className=' w-10 h-10 text-lg text-white rounded-full shadow-md   bg-client-pink font-semibold hover:scale-95 transition-all duration-500' text="MR" onClick={toggleUserList} />
            {showUserList && (<HeaderUserList />)}
        </div>
    )
}

export default ClientHeaderRightSideComponents