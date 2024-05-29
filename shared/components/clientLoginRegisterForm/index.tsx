import Image from 'next/image'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import ClientInput from '../clientInput'
import AdminModalButton from '../adminModalButton'

import { LuEye } from 'react-icons/lu'
import { LuEyeOff } from 'react-icons/lu'
import { useRouter } from 'next/router'
import { Button, useToast } from '@chakra-ui/react'
import { useFormik } from 'formik'
import { adminLogin, token } from '@/shared/types/admin'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { postAdmin } from '@/shared/services/admin'

const initialValues = {
  email: '',
  password: '',
}

const ClientLoginRegisterForm = () => {
  const { t } = useTranslation()
  const [showLogin, setShowLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState('')

  // switch func
  const switchForm = () => {
    setShowLogin(!showLogin)
  }

  //toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value)
  }

  const toast = useToast()
  const { push } = useRouter()
  const [disable, setDisable] = useState(false)

  const { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues,
    onSubmit: handleForm,
    validate: (form) => {
      const error: any = {}
      const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

      if (!form?.email?.trim()) {
        error.email = 'Require field'
      }

      if (!regEmail.test(form?.email?.trim())) {
        error.email = 'Enter correct email'
      }

      if (!form?.password?.trim()) {
        error.password = 'Require field'
      }

      return error
    },
  })

  async function handleForm(data: adminLogin) {
    try {
      setDisable(true)
      const res = await postAdmin(data)
      console.log(res, 'res')

      if (res === undefined) {
        return toast({
          description: 'Try again!',
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        })
      }

      localStorage.setItem('userInfo', JSON.stringify(res?.data?.user))

      toast({
        description: "You've entered",
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      })
      push('/')
    } catch (error) {
      toast({
        description: 'Something wrong',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      })
    } finally {
      setDisable(false)
    }
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
        {showLogin ? (
          <form className="w-full flex flex-col items-center gap-6 mx-auto sm:w-4/5">
            <ClientInput
              p="Email"
              classNameDiv="w-full flex flex-col gap-2"
              classNameLabel="font-medium text-client-main-gray2 text-xl"
              classNameInput="outline-none p-4 rounded-md bg-client-light-red w-full"
              type="email"
              name="email"
              onChange={handleChange}
            />
            <ClientInput
              p={t('Password')}
              classNameDiv="w-full flex flex-col gap-2 mb-8"
              classNameLabel="font-medium text-client-main-gray2 text-xl"
              classNameInput="outline-none p-4 rounded-md bg-client-light-red w-full"
              type={showPassword ? 'text' : 'password'}
              onChange={(e: any) => {
                handlePasswordChange(e), handleChange(e)
              }}
              name="password"
            >
              {showPassword ? (
                <LuEye
                  className=" w-8 h-5 absolute inset-y-0 right-0  top-4 flex items-center pr-2 cursor-pointer"
                  onClick={togglePasswordVisibility}
                />
              ) : (
                <LuEyeOff
                  className=" w-8 h-5 absolute inset-y-0 right-0  top-4 flex items-center pr-2 cursor-pointer"
                  onClick={togglePasswordVisibility}
                />
              )}
            </ClientInput>
            <Button
              variant="danger"
              type="submit"
              fontSize="20px"
              onClick={() => handleSubmit()}
              className="bg-client-login-mainColor w-full font-medium p-7 text-xl rounded-md text-white hover:scale-95 transition-all duration-500"
              isLoading={disable}
            >
              {t('Log in')}
            </Button>
          </form>
        ) : (
          <form className="w-full flex flex-col items-center gap-6 mx-auto sm:w-4/5">
            <ClientInput
              p={t('Full Name')}
              classNameDiv="w-full flex flex-col gap-2"
              classNameLabel="font-medium text-client-main-gray2 text-xl"
              classNameInput="outline-none p-4 rounded-md bg-client-light-red w-full"
            />
            <ClientInput
              p={t('Username')}
              classNameDiv="w-full flex flex-col gap-2"
              classNameLabel="font-medium text-client-main-gray2 text-xl"
              classNameInput="outline-none p-4 rounded-md bg-client-light-red w-full"
            />
            <ClientInput
              p="Email"
              classNameDiv="w-full flex flex-col gap-2"
              classNameLabel="font-medium text-client-main-gray2 text-xl"
              classNameInput="outline-none p-4 rounded-md bg-client-light-red w-full"
              type="email"
            />
            <ClientInput
              p={t('Password')}
              classNameDiv="w-full flex flex-col gap-2 mb-8"
              classNameLabel="font-medium text-client-main-gray2 text-xl"
              classNameInput="outline-none p-4 rounded-md bg-client-light-red w-full"
              type={showPassword ? 'text' : 'password'}
              onChange={handlePasswordChange}
            >
              {showPassword ? (
                <LuEye
                  className=" w-8 h-5 absolute inset-y-0 right-0  top-4 flex items-center pr-2 cursor-pointer"
                  onClick={togglePasswordVisibility}
                />
              ) : (
                <LuEyeOff
                  className=" w-8 h-5 absolute inset-y-0 right-0  top-4 flex items-center pr-2 cursor-pointer"
                  onClick={togglePasswordVisibility}
                />
              )}
            </ClientInput>
            <AdminModalButton
              className="bg-client-login-mainColor w-full font-medium p-4 text-xl rounded-md text-white hover:scale-95 transition-all duration-300"
              text={t('Register')}
            />
          </form>
        )}
      </div>
    </div>
  )
}

export default ClientLoginRegisterForm

// export async function getStaticProps({ locale }: { locale: any }) {
//   return {
//     props: { ...(await serverSideTranslations(locale, ['admin'])) },
//   }
// }
