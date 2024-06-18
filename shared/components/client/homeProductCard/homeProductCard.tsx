import { Product } from '@/shared/types/admin'
import Image from 'next/image'
import React from 'react'

function HomeProductCard({
  product,
  key,
  index,
}: {
  product: Product
  key: number
  index: number
}) {
  function Position(index: number) {
    if (index == 0) return 'slide-right'
    else if (index == 1) return 'slide-up'
    else return 'slide-left'
  }
  console.log(index, '2index')

  return (
    <div
      key={key}
      data-aos={Position(index)}
      className="flex flex-col gap-6 text-center pb-7 shadow-xl px-2 md:px-4 sm:px-6 w-72 h-80 sm:w-60 sm:h-72 lg:w-80 lg:h-96"
    >
      <div className="overflow-hidden">
        <Image
          width={240}
          height={222}
          src={product.img_url}
          alt={product.name}
          className="mx-auto object-fill md:w-[240px] md:h-[222px] w-[204px] h-[200px]"
        />
      </div>
      <p className="text-client-main-gray2 xl:text-3xl text-2xl font-bold">
        {product.name}
      </p>
      <p className="text-client-main-gray1 w-2/3 mx-auto sm:text-lg text-base font-normal">
        {product.description}
      </p>
    </div>
  )
}

export default HomeProductCard
