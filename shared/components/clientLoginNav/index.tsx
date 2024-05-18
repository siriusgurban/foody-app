import Image from 'next/image'
import React from 'react'
import Foody from '../foody'
import { Lang } from '../Lang'
const ClientLoginNav = () => {

    return (
        <nav className=' bg-client-login-mainColor h-32 flex justify-between m-0 sm:m-8 items-center py-10 px-4 sm:p-11 '>
            <div className='flex gap-5 my-auto'>
                <Image
                    src={'/hamburgerMenu.svg'}
                    width={20}
                    height={14}
                    alt="hamburgerMenu"
                    // className="cursor-pointer"
                    className="md:hidden lg:hidden xl:hidden"
                />
                <Foody role="admin" />
            </div>
            <div className=''>
                <Lang />
            </div>
        </nav>
    )
}

export default ClientLoginNav