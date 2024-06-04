import Image from 'next/image'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import ClientLogin from '../clientLogin'
import ClientRegister from '../clientRegister'

const ClientLoginRegisterForm = () => {
  const { t } = useTranslation('client')
  const [showLogin, setShowLogin] = useState(true)

  // switch func
  const switchForm = () => {
    setShowLogin(!showLogin)
  }

  return (
    <div className="flex flex-col mt-5 sm:mt-0 sm:flex-row justify-center bg-white mx-8 mb-8">
      <div className="flex-1 flex justify-center items-center bg-client-login-mainColor p-4 sm:p-3  ">
        <Image
          className="m-auto w-full sm:w-4/5"
          width={200}
          height={200}
          src={showLogin ? '/clientLogin.svg' : '/clientRegister.svg'}
          alt={showLogin ? 'Client Login' : 'Client Register'}
          layout="intrinsic"
        />
      </div>

      <div className="flex-1 flex flex-col gap-20 bg-white py-12 mx-auto w-full sm:w-1/2">
        {/* Switch buttons*/}
        <div className="flex gap-4 sm:gap-16 mx-auto w-max">
          <button
            className={`font-medium text-base sm:text-xl lg:text-3xl ${
              showLogin
                ? ' text-client-login-mainColor'
                : 'text-client-main-gray1'
            }`}
            onClick={switchForm}
          >
            {t('Login')}
          </button>
          <button
            className={`font-medium text-base sm:text-xl lg:text-3xl ${
              showLogin
                ? 'text-client-main-gray1'
                : 'font-medium text-client-login-mainColor'
            }`}
            onClick={switchForm}
          >
            {t('Register')}
          </button>
        </div>

        {/* Form areas */}
        {showLogin ? <ClientLogin /> : <ClientRegister />}
      </div>
    </div>
  )
}

export default ClientLoginRegisterForm
