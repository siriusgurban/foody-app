import React, { useState } from 'react'
// import { Lang } from '../Lang'
import Image from 'next/image'
import AdminModalButton from '../../admin/adminModalButton'
import HeaderUserList from '../headerUserList'
import { useQuery } from '@tanstack/react-query'
import { getBasket } from '@/shared/services/basket'
import { useRouter } from 'next/router'
import { getUser } from '@/shared/services/admin'
import { QUERY } from '@/shared/constants/query'
import { Lang } from '../../common/Lang'

const ClientHeaderRightSideComponents = () => {
  const [showUserList, setShowUserList] = useState(false)
  const { push } = useRouter()

  const toggleUserList = () => {
    setShowUserList(!showUserList)
  }

  const { data: basket } = useQuery({
    queryFn: () => getBasket(),
    queryKey: [QUERY.BASKET],
  })

  const { data, status, error } = useQuery({
    queryFn: getUser,
    queryKey: [QUERY.USER],
  })

  // console.log(data, 'user')

  return (
    <div className="relative items-center gap-5  hidden md:flex ">
      <Lang bg={'white'} />
      {/* <div className='relative bg-client-login-mainColor   rounded-full   w-10 h-10  flex justify-center cursor-pointer  hover:scale-95 transition-all duration-500  '>
                <Image width={30} height={0} src='/basket.svg' alt='basket' className='   ' />
                <span className='flex justify-center items-center text-sm  w-4 h-4  text-client-main-red font-extrabold  absolute   left-8 top-[-1px]  z-10'>0</span>
            </div> */}
      <div
        className="relative bg-client-login-mainColor   rounded-full   w-10 h-10  flex justify-center cursor-pointer  hover:scale-95 transition-all duration-500"
        onClick={() => push('/user?page=basket')}
      >
        <Image
          width={30}
          height={0}
          src="/basket.svg"
          alt="basket"
          className="cursor-pointer hover:scale-95 transition-all duration-500   "
        />
        <span className="text-white font-extrabold  w-4 h-4 flex justify-center items-center text-[12px] absolute right-[-4px] top-[-4px] bg-client-login-mainColor z-10 rounded-full">
          {basket?.data?.result?.data?.total_item}
        </span>
      </div>
      <AdminModalButton
        className=" w-10 h-10 text-lg text-white rounded-full shadow-md   bg-client-pink font-semibold hover:scale-95 transition-all duration-500"
        text={data?.data?.user?.email[0].toUpperCase()}
        onClick={toggleUserList}
      />
      {showUserList && <HeaderUserList onToggle={toggleUserList} />}
    </div>
  )
}

export default ClientHeaderRightSideComponents
