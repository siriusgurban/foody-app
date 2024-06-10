import { CLIENT } from '@/shared/constants/router';
import Image from 'next/image'
import { useRouter } from 'next/router';
import React from 'react'

interface Props {
    src: string;
    rest_name: string;
    rest_desc: string;
 //   onClick?: any;
    id?:string;
}

const HeaderSearchRestaurantCard = ({ src, rest_name, rest_desc ,id}: Props) => {
    const { push } = useRouter();

    //console.log("srcc",onClick)
    return (
        <div                 onClick={() => push(`${CLIENT.RESTAURANTS}/${id}`)}
        className='flex items-center gap-5 bg-client-white hover:bg-client-fill-gray  border-b p-4 mb-5 cursor-pointer'>
            <Image width={60} height={0} src={src} alt={src} />
            <div className='w-full  flex flex-col'>
                <p className='   font-bold  text-sm whitespace-nowrap overflow-x-auto text-client-search-modal-text'>{rest_name}</p>
                <p className='  font-normal text-sm whitespace-nowrap overflow-x-auto  text-client-search-modal-text'>{rest_desc}</p>
            </div>
        </div>
    )
}

export default HeaderSearchRestaurantCard