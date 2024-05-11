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
  useToast,
} from '@chakra-ui/react'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import { postAdmin } from '../../../shared/services/admin'
import Head from 'next/head'
import Image from 'next/image'

function Login() {
  const { t } = useTranslation('admin')
  const toast = useToast()
  const { push } = useRouter()

  const initialValues = {
    email: '',
    password: '',
  }

  // const newPost = { email: 'admin@gmail.com', password: '123456' }

  const { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues,
    onSubmit: handleForm,
    validate: (form) => {
      const error = {}
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

  async function handleForm(data) {
    console.log(data, 'data')
    try {
      await postAdmin(data)
      toast({
        description: 'Your post created',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      })
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
      </Head>
      <div className="bg-admin-bg h-lvh flex justify-center align-middle m-auto">
        <Box className="flex sm:flex-col-reverse xs:flex-col-reverse">
          <Box
            // width={424}
            height={410}
            className="flex flex-col justify-center bg-admin-main px-10"
          >
            <Heading className="text-admin-text text-center text-4xl md:text-3xl sm:text-2xl mb-10">
              {t('welcome-admin')}
            </Heading>
            <FormControl className="p-0 max-w-80">
              <Input
                type="text"
                id="email"
                name="email"
                placeholder="User Email"
                onChange={handleChange}
                className="mb-6"
              />
              {errors?.email && (
                <FormHelperText color="red">{errors?.email}</FormHelperText>
              )}
              <Input
                type="password"
                id="password"
                name="password"
                placeholder="User password"
                onChange={handleChange}
                className="mb-9"
              />

              {errors?.password && (
                <FormHelperText color="red">{errors?.password}</FormHelperText>
              )}
              <Button
                variant="danger"
                type="submit"
                className="w-full bg-admin-btn text-[#ffffff]"
                onClick={handleSubmit}
              >
                {t('signin')}
              </Button>
            </FormControl>
          </Box>
          <Box
            className="bg-[#ffffff] flex align-middle justify-center xs:bg-admin-bg sm:bg-admin-bg"
            width={424}
            height={410}
          >
            <Image
              alt="adminlogin"
              src={'/adminlogin.svg'}
              width={346}
              height={304}
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
