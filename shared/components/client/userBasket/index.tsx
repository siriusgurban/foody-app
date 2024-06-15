import Image from 'next/image'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import AdminModalButton from '../../admin/adminModalButton'
import UserBasketCard from '../userBasketCard'
import {
  clearBasket,
  deleteBasket,
  getBasket,
  postBasket,
} from '@/shared/services/basket'
import { CustomMutationOptions, Product } from '@/shared/types/admin'
import { QUERY } from '@/shared/constants/query'
import { Box, useToast } from '@chakra-ui/react'
import { useBasket } from '@/shared/hooks/useBasket'
import BasketEmpty from '../basketEmpty'

interface Restaurant {
  name: string
  img_url: string
  cuisine: string
  id: any
}

// interface Props {}

const UserBasket: FC<any> = ({}) => {
  const { t } = useTranslation('client')
  const { push } = useRouter()

  const { data } = useQuery({
    queryFn: getBasket,
    queryKey: [QUERY.BASKET],
  })

  // console.log(data?.data?.result?.data?.items, 'data?.data?.items?')

  const restaurantsDatas: Restaurant[] = data?.data?.result?.data ?? []

  const { handle: handleAddBasket } = useBasket({
    queryFn: postBasket,
    queryKey: QUERY.BASKET,
    toastText: 'Item added',
  })
  const { handle: handleBasketDelete } = useBasket({
    queryFn: deleteBasket,
    queryKey: QUERY.BASKET,
    toastText: 'Item deleted',
  })
  const { handle: handleBasketClear } = useBasket({
    queryFn: clearBasket,
    queryKey: QUERY.BASKET,
    toastText: 'Basket cleared',
  })

  return (
    <section className="w-full flex flex-col px-4 sm:px-8 py-10 flex-wrap gap-0 sm:bg-client-gray7 ">
      <h2 className=" text-client-main-gray2 font-semibold text-3xl">
        {t('Your Basket')}
      </h2>
      <div className="hidden items-center gap-2 text-3xl border-b-2 border-client-gray5 pb-4 sm:flex ">
        <Image
          width={25}
          height={22}
          src={`${
            data?.data?.result?.data?.total_item == 0 ||
            data?.data?.result?.data?.total_item == undefined
              ? '/basket.svg'
              : '/basketRed.svg'
          }`}
          alt="userBasket"
        />
        <p
          className={`text-base text-${
            data?.data?.result?.data?.total_item == 0 ||
            data?.data?.result?.data?.total_item == undefined
              ? 'client-rest-grey'
              : 'client-main-red'
          }   font-medium`}
        >
          {data?.data?.result?.data?.total_item} {t('items')}
        </p>
      </div>
      <div className="mb-5 h-[470px] w-full overflow-y-auto overflow-x-hidden scrollbarClient">
        {data?.data?.result?.data?.total_item == 0 ||
        data?.data?.result?.data?.total_item == undefined ? (
          <BasketEmpty />
        ) : (
          data?.data?.result?.data?.items?.map(
            (item: Product, index: number) => (
              <UserBasketCard
                key={index}
                clearBasket={() =>
                  handleBasketClear(data?.data?.result?.data?.id)
                }
                decreaseCount={handleBasketDelete}
                increaseCount={handleAddBasket}
                name={item?.name}
                price={item?.price}
                count={item?.count}
                src={item?.img_url}
                alt={item?.name}
                id={item?.id}
              />
            ),
          )
        )}
      </div>

      <Box
        as="button"
        disabled={data?.data?.result?.data?.total_item == 0 ? true : false}
        className={`bg-${
          data?.data?.result?.data?.total_item == 0 ||
          data?.data?.result?.data?.total_item == undefined
            ? 'client-rest-grey1'
            : 'client-main-red'
        } text-white flex items-center mt-8 justify-between lg:pl-10 sm:pl-8 pl-6 pr-2 py-1 rounded-full shadow-md`}
      >
        <p className="font-medium text-sm sm:text-lg lg:text-2xl">
          {t('Checkout')}
        </p>
        <AdminModalButton
          className={`bg-white text-${
            data?.data?.result?.data?.total_item == 0 ||
            data?.data?.result?.data?.total_item == undefined
              ? 'client-rest-grey'
              : 'client-main-red'
          } rounded-full py-1 px-4 sm:px-8 lg:px-16 font-medium text-sm sm:text-base lg:text-lg hover:scale-95 transition-all duration-500`}
          text={`$${
            data?.data?.result?.data?.total_amount
              ? data?.data?.result?.data?.total_amount
              : '0.00'
          }`}
          onClick={() => push('?page=' + 'checkout')}
        />
      </Box>
    </section>
  )
}

export default UserBasket
