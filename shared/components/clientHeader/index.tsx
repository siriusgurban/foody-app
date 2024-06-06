import React, { useEffect, useLayoutEffect, useState } from 'react'
import Navbar from '../clientHeaderNavbar'
import Image from 'next/image'
import ClientHeaderRightSideComponents from '../clientHeaderRightSideComponents'
import HeaderSearchRestaurantModal from '../headerSearchRestaurantModal'
import ClientHeaderLangLogin from '../../components/clientHeaderLangLogin'
import { useTranslation } from 'react-i18next'
import { GrClose } from 'react-icons/gr'
import AdminModalButton from '../adminModalButton'
import { useRouter } from 'next/router'
import { Lang } from '../Lang'
import { getUser } from '@/shared/services/admin'
import { useQuery } from '@tanstack/react-query'
import Foody from '../foody'

const ClientHeader = () => {
  const { t } = useTranslation()
  const [isModalOpen, setModalOpen] = useState(false)
  const [searchModal, setSearchModal] = useState(false)
  const [testState, setTestState] = useState(false)
  const [userInfo, setUserInfo] = useState({})

  const { push, reload } = useRouter()

  function deleteUser() {
    localStorage.removeItem('userInfo')
    setTimeout(() => {
      push('/')
    }, 1500)
    setTimeout(() => {
      reload()
    }, 2500)
  }

  const { data, status, error } = useQuery({
    queryFn: getUser,
    queryKey: ['user'],
  })

  console.log(userInfo, 'statusstatus')

  useLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      const userInfoString = localStorage.getItem('userInfo')
      if (userInfoString) {
        const parsedUserInfo = JSON.parse(userInfoString)
        setUserInfo(parsedUserInfo)
      }
    }
  }, [isModalOpen])

  console.log(data, 'UserData')

  const toggleAvatars = () => {
    if (userInfo !== undefined && data !== undefined) {
      setTestState(true)
    } else {
      setTestState(false)
    }
  }

  const showHideModal = () => {
    setModalOpen(!isModalOpen)
  }

  const closeSearchModal = () => {
    setSearchModal(false)
  }

  const openSearchModal = () => {
    setSearchModal(true)
  }

  async function searchRestaurant(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e.target.value)
  }

  return (
    <nav className="flex justify-between  items-center m-0 rounded-md py-11 px-5 sm:m-8   cursor-pointer   bg-client-fill-gray sm:p-11">
      <h1
        className="flex items-center text-4xl font-extrabold text-client-zero-black"
        onClick={toggleAvatars}
      >
        <button onClick={showHideModal} className="md:hidden block mr-5">
          <Image width={40} height={0} src="/hamburger.svg" alt="hamburger" />
        </button>
        <Foody role="client" />
      </h1>
      <>
        {userInfo !== undefined && data !== undefined ? (
          <>
            <Navbar />
            <div className=" hidden w-1/5 md:block">
              <input
                type="text"
                placeholder="Search"
                onChange={searchRestaurant}
                className=" outline-none w-full relative  py-3 px-6  shadow-sm rounded-xl  "
                onFocus={openSearchModal}
                // onBlur={closeSearchModal}
              />
              {searchModal && (
                <HeaderSearchRestaurantModal onClose={closeSearchModal} />
              )}
            </div>
            <Lang bg={'white'} />
            <ClientHeaderRightSideComponents />
          </>
        ) : (
          <>
            <Navbar />
            <div className=" hidden w-1/5 sm:block">
              <input
                type="text"
                placeholder="Search"
                onChange={searchRestaurant}
                className=" outline-none w-full relative  py-3 px-6  shadow-sm rounded-xl  "
                onFocus={openSearchModal}
                // onBlur={closeSearchModal}
              />
              {searchModal && (
                <HeaderSearchRestaurantModal onClose={closeSearchModal} />
              )}
            </div>
            <Lang bg={'white'} />
            <ClientHeaderLangLogin />
          </>
        )}
      </>

      {/* mobile design */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black m-0 min-h-screen bg-opacity-50 z-50 flex items-center justify-start">
          <div className="bg-white w-4/5 min-h-screen p-8 flex flex-col">
            <button
              className=" font-bold text-lg block   text-client-main-gray2 hover:text-client-main-red text-start   w-4 h-4"
              onClick={showHideModal}
            >
              <GrClose />
            </button>
            {testState ? (
              <AdminModalButton
                className="text-client-zero-black w-full mt-8 mx-auto py-4 rounded-full text-2xl font-medium flex items-center   justify-start"
                text="MR"
              >
                <Image
                  src="/userAvatar.svg"
                  width={40}
                  height={40}
                  alt="userAvatar"
                  className="rounded-full mr-2"
                />
              </AdminModalButton>
            ) : (
              <AdminModalButton
                className=" bg-client-main-red  w-6/12 mt-16 mb-16 mx-auto py-4 rounded-full  text-2xl text-white font-medium  "
                text={t('Sign Up')}
                onClick={() => push('/login')}
              />
            )}
            <ul className="flex flex-col justify-around  gap-4  mt-4  w-full font-medium  text-lg  text-client-main-gray1">
              <li
                onClick={() => push('/')}
                className="cursor-pointer hover:text-client-main-red transition-all  text-xl"
              >
                {t('Home')}
              </li>
              {testState && (
                <>
                  <li
                    onClick={() => push('/user?=profile')}
                    className="cursor-pointer hover:text-client-main-red transition-all  text-xl"
                  >
                    {t('Profile')}
                  </li>
                  <li
                    onClick={() => push('/user?=basket')}
                    className="cursor-pointer hover:text-client-main-red transition-all  text-xl"
                  >
                    {t('Your Basket')}
                  </li>
                  <li
                    onClick={() => push('/user?=orders')}
                    className="cursor-pointer hover:text-client-main-red transition-all  text-xl"
                  >
                    {t('Your Orders')}
                  </li>
                  <li
                    onClick={() => push('/user?=checkout')}
                    className="cursor-pointer hover:text-client-main-red transition-all  text-xl"
                  >
                    {t('Checkout')}
                  </li>
                </>
              )}

              <li
                onClick={() => push('/restaurants')}
                className="cursor-pointer hover:text-client-main-red transition-all  text-xl"
              >
                {t('Restaurants')}
              </li>
              <li
                onClick={() => push('/about-us')}
                className="cursor-pointer hover:text-client-main-red transition-all  text-xl"
              >
                {t('About Us')}
              </li>
              <li
                onClick={() => push('/how-it-works')}
                className="cursor-pointer hover:text-client-main-red transition-all  text-xl"
              >
                {t('How It Works')}
              </li>
              <li
                onClick={() => push('/faqs')}
                className="cursor-pointer hover:text-client-main-red transition-all  text-xl"
              >
                {t('Faqs')}
              </li>
              {testState && (
                <li
                  onClick={() => deleteUser()}
                  className="cursor-pointer hover:text-client-main-red transition-all  text-xl"
                >
                  {t('Log Out')}
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
    </nav>
  )
}

export default ClientHeader
