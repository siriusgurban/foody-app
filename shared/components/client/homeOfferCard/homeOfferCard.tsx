import { Offer } from '@/shared/types/admin'
import Image from 'next/image'
import React from 'react'

function HomeOfferCard({
  offer,
  key,
  index,
}: {
  offer: Offer
  key: number
  index: number
}) {
  function Position(index: number) {
    if (index % 2 === 1) return 'slide-right'
    else return 'slide-left'
  }

  function PositionReverse(index: number) {
    if (index % 2 === 1) return 'slide-left'
    else return 'slide-right'
  }

  console.log(index, 'index')

  if (index % 2 === 1) {
    return (
      <div
        key={key}
        className={`flex flex-col sm:gap-8 lg:gap-28 sm:flex-row-reverse justify-center  px-3 sm:px-11 mt-1 xs:mt-28`}
      >
        <div
          data-aos={PositionReverse(index)}
          className="flex flex-col gap-8 w-full sm:w-1/2"
        >
          <h3 className="text-2xl leading-loose font-black text-client-manin-black w-full sm:w-full sm:text-6xl  text-center mx-auto sm:mx-0 sm:text-start">
            {offer?.name}
          </h3>
          <p className="text-client-main-gray1 font-normal text-base sm:text-2xl w-full mb-8 sm:mb-0 sm:w-3/5 mx-auto text-center sm:text-start sm:mx-0">
            {offer?.description}
          </p>
        </div>
        <div data-aos={Position(index)} className="relative w-full sm:w-1/2">
          <Image
            className="w-full"
            width={0}
            height={0}
            src="/frencHomeRectangle.svg"
            alt="french"
          />
          <Image
            className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  w-10/12    rounded-3xl"
            width={200}
            height={200}
            src={offer.img_url}
            alt={offer.name}
          />
          {/* <img src={offer.img_url} alt={offer.name} className='rounded-xl  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10/12' /> */}
        </div>
      </div>
    )
  }

  return (
    <div
      key={key}
      className={`flex flex-col sm:gap-8 sm:flex-row justify-center  px-3 sm:px-11 mt-1 xs:mt-28`}
    >
      <div
        data-aos={PositionReverse(index)}
        className="flex flex-col gap-8 w-full sm:w-1/2"
      >
        <h3 className="text-2xl leading-loose font-black text-client-manin-black w-full sm:w-full sm:text-6xl text-center mx-auto sm:mx-0 sm:text-start">
          {offer?.name}
        </h3>
        <p className="text-client-main-gray1 font-normal text-base sm:text-2xl w-full mb-8 sm:mb-0 sm:w-3/5 mx-auto text-center sm:text-start sm:mx-0">
          {offer?.description}
        </p>
      </div>
      <div data-aos={Position(index)} className="relative w-full sm:w-1/2 ">
        <Image
          className="w-full"
          width={0}
          height={0}
          src="/frencHomeRectangle.svg"
          alt="french"
        />
        <Image
          className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  w-10/12    rounded-3xl"
          width={200}
          height={200}
          src={offer.img_url}
          alt={offer.name}
        />
        {/* <img src={offer.img_url} alt={offer.name} className='rounded-xl  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10/12' /> */}
      </div>
    </div>
  )
}

export default HomeOfferCard
