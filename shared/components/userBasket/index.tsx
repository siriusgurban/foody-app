import Image from 'next/image'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import AdminModalButton from '../adminModalButton'
import UserBasketCard from '../userBasketCard'
import { getBasket } from '@/shared/services/basket'
import { Product } from '@/shared/types/admin'

interface Restaurant {
  name: string
  img_url: string
  cuisine: string
  id: any
}

interface Props {}

const UserBasket: FC<Props> = ({}) => {
  const { t } = useTranslation('client')
  const { push } = useRouter()
  const { data } = useQuery({
    queryFn: getBasket,
    queryKey: ['basket'],
  })

  console.log(data?.data?.result?.data?.items, 'data?.data?.items?')

  const restaurantsDatas: Restaurant[] = data?.data?.result?.data ?? []

  return (
    <section className="w-full flex flex-col px-3 sm:px-8 py-10 flex-wrap gap-0 sm:bg-client-gray7 ">
      <h2 className=" text-client-main-gray2 font-semibold text-3xl">
        {t('Your Basket')}
      </h2>
      <div className="flex items-center gap-2 text-3xl border-b-2   border-client-gray5 pb-4">
        <Image width={20} height={20} src="/basketRed.svg" alt="userBasket" />
        <p className="  text-base  text-client-main-red font-medium">
          {data?.data?.result?.data?.total_item} {t('items')}
        </p>
      </div>
      <div className="mb-5 max-h-[300px] overflow-y-auto ">
        {data?.data?.result?.data?.items?.map(
          (item: Product, index: number) => (
            <UserBasketCard
              key={index}
              clearBasket={() => console.log(`Clearing ${item.id}`)}
              decreaseCount={() => console.log(`Decreasing ${item.id}`)}
              increaseCount={() => console.log(`Increasing ${item.id}`)}
              name={item?.name}
              price={item?.price}
              count={item?.count}
              src={item?.img_url}
              alt={item?.name}
            />
          ),
        )}
      </div>

      <div className="  bg-client-main-red text-white flex items-center mt-8 justify-between pl-10 pr-2 py-2 rounded-full shadow-md">
        <p className="font-medium text-2xl">{t('Checkout')}</p>
        <AdminModalButton
          className="bg-white   text-client-main-red rounded-full py-1 px-16 font-medium text-lg hover:scale-95 transition-all duration-500"
          text={data?.data?.result?.data?.total_amount}
          onClick={() => push('/checkout')}
        />
      </div>
    </section>
  )
}

export default UserBasket
