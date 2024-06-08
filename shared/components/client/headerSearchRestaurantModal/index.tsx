import React from 'react'
import AdminModalButton from '../../admin/adminModalButton'
import HeaderSearchRestaurantCard from '../headerSearchRestaurantCard'
import Image from 'next/image'
import { IoCloseSharp } from 'react-icons/io5'

const HeaderSearchRestaurantModal = ({ onClose }: any) => {
  return (
    <div className="w-[30%] rounded-lg flex flex-col justify-between py-5 bg-client-white absolute top-[135px] right-[20.75%] z-50">
      <IoCloseSharp
        className="absolute top-4 right-4 cursor-pointer text-2xl text-client-main-red hover:text-client-pink  hover:scale-95 transition-all duration-500"
        onClick={onClose}
      />

      <div className="max-h-[180px] overflow-y-auto">
        <HeaderSearchRestaurantCard
          src="/test.svg"
          rest_name="mc"
          rest_desc="fastfood"
        />
        <HeaderSearchRestaurantCard
          src="/test.svg"
          rest_name="mc"
          rest_desc="fastfood"
        />
        <HeaderSearchRestaurantCard
          src="/test.svg"
          rest_name="mc"
          rest_desc="fastfood"
        />
        {/* Add more cards as needed */}
      </div>
      <div className="flex justify-center items-center font-light w-full text-lg text-client-search-modal-text mt-5">
        More
        <span className="ml-2">
          <Image width={15} height={15} src="/moreArrow.svg" alt="read_more" />
        </span>
      </div>
    </div>
  )
}

export default HeaderSearchRestaurantModal
