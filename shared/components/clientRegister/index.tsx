import React, { useState } from 'react'
import ClientInput from '../clientInput'
import { useFormik } from 'formik'
import { adminLogin } from '@/shared/types/admin'
import { postClient } from '@/shared/services/admin'
import { Button, useToast } from '@chakra-ui/react'
import { LuEye, LuEyeOff } from 'react-icons/lu'
import { useTranslation } from 'react-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const initialValues = {
  username: '',
  fullname: '',
  email: '',
  password: '',
}

function ClientRegister() {
  const toast = useToast()
  const { t } = useTranslation('client')
  const [disable, setDisable] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState('')

  //toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value)
  }

  const { values, handleChange, handleSubmit, errors, resetForm } = useFormik({
    initialValues,
    onSubmit: (values) => handleForm(values),
    validate: (form) => {
      const error: any = {}
      const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

      if (!form?.username?.trim()) {
        error.username = 'Require field'
      }

      if (!form?.fullname?.trim()) {
        error.fullname = 'Require field'
      }

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
      console.log(data, 'data')
      const res = await postClient(data)
      console.log(res, 'res')

      if (res?.status === 201) {
        toast({
          description: "You've registered",
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        })
        resetForm() // Reset the form with initial values
      } else {
        toast({
          description: 'Something wrong',
          status: 'warning',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        })
      }
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
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col items-center gap-6 mx-auto sm:w-4/5"
    >
      <ClientInput
        p={t('Full Name')}
        classNameDiv="w-full flex flex-col gap-2"
        classNameLabel="font-medium text-client-main-gray2 text-xl"
        classNameInput="outline-none p-4 rounded-md bg-client-light-red w-full"
        type="fullname"
        name="fullname"
        value={values.fullname}
        onChange={handleChange}
      />
      <ClientInput
        p={t('Username')}
        classNameDiv="w-full flex flex-col gap-2"
        classNameLabel="font-medium text-client-main-gray2 text-xl"
        classNameInput="outline-none p-4 rounded-md bg-client-light-red w-full"
        type="username"
        name="username"
        value={values.username}
        onChange={handleChange}
      />
      <ClientInput
        p={t('Email')}
        classNameDiv="w-full flex flex-col gap-2"
        classNameLabel="font-medium text-client-main-gray2 text-xl"
        classNameInput="outline-none p-4 rounded-md bg-client-light-red w-full"
        type="email"
        name="email"
        value={values.email}
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
        value={values.password}
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
        // onClick={() => handleSubmit()}
        className="bg-client-login-mainColor w-full font-medium p-7 text-xl rounded-md text-white hover:scale-95 transition-all duration-500"
        isLoading={disable}
      >
        {t('Register')}
      </Button>
    </form>
  )
}

export default ClientRegister
