import React from 'react'
import AdminModalButton from '../../admin/adminModalButton'
import HeaderSearchRestaurantCard from '../headerSearchRestaurantCard'
import Image from 'next/image'
import { IoCloseSharp } from 'react-icons/io5'

const HeaderSearchRestaurantModal = ({ onClose, searchResults }: any) => {
  console.log("searchResults", searchResults)
  return (
    <div className="w-[30%] rounded-lg flex flex-col justify-between py-5 bg-client-white absolute top-[135px] right-[20.75%] z-50">
      <IoCloseSharp
        className="absolute top-4 right-4 cursor-pointer text-2xl text-client-main-red hover:text-client-pink  hover:scale-95 transition-all duration-500"
        onClick={onClose}
      />

      <div className="max-h-[180px] overflow-y-auto">
        {searchResults && searchResults.map((item: { id: string; img_url: string; name: string; cuisine: string }) => (
          <HeaderSearchRestaurantCard
            key={item.id}
            src={item.img_url}
            rest_name={item.name}
            rest_desc={item.cuisine}
            id={item.id}
          />
        ))}

      </div>
      {/* <div className="flex justify-center items-center font-light w-full text-lg text-client-search-modal-text mt-5">
        More
        <span className="ml-2">
          <Image width={15} height={15} src="/moreArrow.svg" alt="read_more" />
        </span>
      </div> */}
    </div>
  )
}

export default HeaderSearchRestaurantModal

// address
// :
// "Baku"
// category_id
// :
// "7Nof8vNbfsXX2n8naXbr"
// created
// :
// 1717691500900
// cuisine
// :
// "Burger, Fries"
// delivery_min
// :
// "18"
// delivery_price
// :
// "8"
// id
// :
// "StUVWmrEIkQ3lOVC11MU"
// img_url
// :
// "https://firebasestorage.googleapis.com/v0/b/foody-app-f27a2.appspot.com/o/files%2Fimages%2F1717954175861?alt=media&token=d7b397d3-ae9c-4bff-b410-7c233f8873d3"
// name
// :
// "Burger King"