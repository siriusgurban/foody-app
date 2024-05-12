//@ts-nocheck

import React, { useEffect, useState } from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Heading,
  Input,
  InputGroup,
  useToast,
} from '@chakra-ui/react'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import Foody from '@/shared/components/foody'
import { instanceAxios } from '@/shared/helpers/instanceAxios'
import { postAdmin } from '@/shared/services/admin'
import { adminLogin, token } from '@/shared/types/admin'

const initialValues = {
  email: '',
  password: '',
}

function Login() {
  const { t } = useTranslation('admin')
  const toast = useToast()
  const { push } = useRouter()

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

  let tokenObj: token = JSON.parse(
    typeof localStorage !== 'undefined'
      ? localStorage.getItem('tokenObj') ?? '{}'
      : '{}',
  )
  async function handleForm(data: adminLogin) {
    try {
      const res = await postAdmin(data)
      console.log(res, 'res')

      tokenObj = {
        access_token: res?.data.user.access_token,
        refresh_token: res?.data.user.refresh_token,
      }

      localStorage.setItem('tokenObj', JSON.stringify(tokenObj))
      localStorage.setItem('userInfo', JSON.stringify(res?.data.user))

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
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      })
    }
  }

  return (
    <div>
      <Head>
        <title>Admin | {t('login')}</title>
        <link rel="icon" href="/icons8-admin-96.png" />
      </Head>
      <div className="bg-admin-bg h-lvh flex justify-center align-middle ">
        <Box className="absolute left-8 top-14 xs:left-5 xs:top-5 sm:left-7 sm:top-10">
          <Foody role="admin" />
        </Box>

        <Box className="flex sm:flex-col-reverse xs:flex-col-reverse mt-40 xs:mt-2 sm:mt-6">
          <Box
            maxHeight={410}
            maxWidth={424}
            className="flex flex-col justify-center xs:bg-transparent sm:bg-transparent bg-admin-main px-10 w-full"
          >
            <Heading className="text-admin-text text-center lg:text-4xl md:text-3xl sm:text-xl xs:text-xl mb-10 xs:mb-3 sm:mb-6">
              {t('welcome-admin')}
            </Heading>
            <FormControl className="p-0">
              <InputGroup className="mb-6 flex flex-col xs:mb-2 sm:mb-4">
                <Input
                  type="text"
                  id="email"
                  name="email"
                  placeholder={t('email')}
                  onChange={handleChange}
                  className="p-6 xs:p-2 sm:p-4"
                />
                {errors?.email && (
                  <FormHelperText color="red">{errors?.email}</FormHelperText>
                )}
              </InputGroup>
              <InputGroup className="mb-9 flex flex-col xs:mb-2 sm:mb-4">
                <Input
                  type="password"
                  id="password"
                  name="password"
                  placeholder={t('password')}
                  onChange={handleChange}
                  className="p-6 xs:p-2 sm:p-4"
                />
                {errors?.password && (
                  <FormHelperText color="red">
                    {errors?.password}
                  </FormHelperText>
                )}
              </InputGroup>
              <Button
                variant="danger"
                type="submit"
                className="w-full bg-admin-btn text-white p-6 xs:p-2 sm:p-4 font-medium"
                onClick={handleSubmit}
              >
                {t('signin')}
              </Button>
            </FormControl>
          </Box>
          <Box
            className="bg-white flex align-middle justify-center xs:bg-transparent sm:bg-transparent xs:w-32 sm:w-52 xs:mx-auto sm:mx-auto px-7 xs:p-0 sm:p-0 xs:h-12 w-full"
            maxWidth={424}
            maxHeight={410}
          >
            <Image
              alt="adminlogin"
              src={'/adminLogin.svg'}
              width={346}
              height={304}
              className="w-full xs:h-36 sm:h-48"
            />
          </Box>
        </Box>
      </div>
    </div>
  )
}

export default Login

export async function getStaticProps({ locale }: { locale: any }) {
  return {
    props: { ...(await serverSideTranslations(locale, ['admin'])) },
  }
}
