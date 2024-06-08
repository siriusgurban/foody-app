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
      className="flex relative sm:pr-9 justify-between items-center border-b-2 border-client-gray5 py-8"
      key={key}
    >
      <Image width={98} height={98} src={src || ''} alt={alt || 'image'} />
      <div className="flex flex-col w-full pl-7">
        <p className="font-medium text-client-main-gray2 text-2xl">{name}</p>
        <p className="font-medium text-client-main-gray2 text-lg">{price}</p>
      </div>

      <div className="flex flex-col    bg-client-gray7 sm:bg-white py-2 px-2 rounded-full gap-3 items-center">
        <button onClick={() => increaseCount(id)}>
          <IoIosAdd className="cursor-pointer w-7" />
        </button>
        <p className="text-xl font-medium">{count}</p>
        <button onClick={() => decreaseCount(id)}>
          <FiMinus className="cursor-pointer w-7" />
        </button>
      </div>

      <span
        className="absolute top-0 left-0 sm:left-[97%] sm:top-4 w-8"
        onClick={clearBasket}
      >
        <MdOutlineDeleteSweep className="cursor-pointer fill-client-main-gray1 w-7" />
      </span>
    </div>
  )
}

export default UserBasketCard
