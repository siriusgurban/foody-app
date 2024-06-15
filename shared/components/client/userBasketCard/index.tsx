import Image from 'next/image'
import React, { FC } from 'react'
import { FiMinus } from 'react-icons/fi'
import { IoIosAdd } from 'react-icons/io'
import { MdOutlineDeleteSweep } from 'react-icons/md'

interface Props {
  name?: string
  src?: string
  price?: number
  count?: number
  alt?: string
  key?: number
  clearBasket: any
  increaseCount: any
  decreaseCount: any
  id: string
}
const UserBasketCard: FC<Props> = ({
  increaseCount,
  decreaseCount,
  clearBasket,
  name,
  src,
  price,
  count,
  alt,
  key,
  id,
}) => {
  return (
    <div
      className="flex relative sm:pr-9 justify-between items-center border-b-2 border-client-gray5 py-5 sm:py-8"
      key={key}
    >
      <Image
        width={98}
        height={98}
        src={src || ''}
        alt={alt || 'image'}
        className="sm:w-[98px] sm:h-[98px] w-12 h-12 pr-1 object-contain"
      />
      <div className="flex flex-col w-full pl-0.5 sm:pl-4 lg:pl-7 gap-1 sm:gap-2">
        <p className="font-medium text-client-main-gray2 text-sm sm:text-2xl ">
          {name}
        </p>
        <p className="font-medium text-client-main-gray2 text-xs sm:text-lg">
          ${price}
        </p>
      </div>

      <div className="flex flex-col bg-client-gray7 sm:bg-white py-2 px-1 sm:px-2 rounded-full gap-0.5 sm:gap-3 items-center">
        <button onClick={() => increaseCount(id)}>
          <IoIosAdd className="cursor-pointer sm:w-7 w-5" />
        </button>
        <p className="text-base sm:text-xl font-medium">{count}</p>
        <button onClick={() => decreaseCount(id)}>
          <FiMinus className="cursor-pointer sm:w-7 w-5" />
        </button>
      </div>

      <span
        className="absolute  top-2 left-0 lg:left-[96.5%] sm:left-[95%] sm:top-4 w-8"
        onClick={clearBasket}
      >
        <MdOutlineDeleteSweep className="cursor-pointer fill-client-main-gray1 sm:w-8 sm:h-6 w-7 h-5" />
      </span>
    </div>
  )
}

export default UserBasketCard
