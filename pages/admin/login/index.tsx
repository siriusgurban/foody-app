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
import Foody from '@/shared/components/common/foody'
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

  // let tokenObj: token = JSON.parse(
  //   typeof localStorage !== 'undefined'
  //     ? localStorage.getItem('tokenObj') ?? '{}'
  //     : '{}',
  // )
  async function handleForm(data: adminLogin) {
    try {
      setDisable(true)
      const res = await postAdmin(data)
      console.log(res, 'res')

      // tokenObj = {
      //   access_token: res?.data.user.access_token,
      //   refresh_token: res?.data.user.refresh_token,
      // }

      // localStorage.setItem('tokenObj', JSON.stringify(tokenObj))
      // localStorage.setItem('userInfo', JSON.stringify(res?.data.user))

      toast({
        description: "You've entered",
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      })
      push('/admin')
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
    <div>
      <Head>
        <title>Admin | {t('login')}</title>
        <link rel="icon" href="/admin6024190.png" />
      </Head>
      <div className="bg-admin-bg h-lvh flex justify-center align-middle ">
        <Box className="absolute md:left-8 md:top-14 xs:left-3 xs:top-3">
          <Foody role="admin" />
        </Box>

        <Box className="flex lg:flex-row xs:flex-col-reverse xs:my-auto mt-40">
          <Box
            maxHeight={410}
            maxWidth={424}
            className="flex flex-col justify-center md:bg-admin-main xs:bg-transparent p-10 w-full "
          >
            <h1 className="text-admin-text text-center md:text-4xl xs:text-2xl sm:2xl font-bold xs:mb-5 md:mb-10 ">
              {t('welcome-admin')}
            </h1>
            <FormControl className="p-0  mx-auto">
              <InputGroup className="md:mb-6 xs:mb-3 flex flex-col">
                <Input
                  type="text"
                  id="email"
                  name="email"
                  placeholder={t('email')}
                  onChange={handleChange}
                  className=" md:p-6 xs:p-2"
                  sx={{ bgColor: '#5A5B70' }}
                />
                {errors?.email && (
                  <FormHelperText color="red">{errors?.email}</FormHelperText>
                )}
              </InputGroup>
              <InputGroup className="md:mb-9 xs:mb-6 flex flex-col">
                <Input
                  type="password"
                  id="password"
                  name="password"
                  placeholder={t('password')}
                  onChange={handleChange}
                  className=" md:p-6 xs:p-2 "
                  sx={{ bgColor: '#5A5B70' }}
                />
                {errors?.password && (
                  <FormHelperText color="red">
                    {errors?.password}
                  </FormHelperText>
                )}
              </InputGroup>
              <Box className="flex justify-center">
                <Button
                  variant="danger"
                  type="submit"
                  className="w-full bg-admin-btn hover:bg-admin-btnhover text-white md:p-6 xs:p-3 font-medium"
                  onClick={() => handleSubmit()}
                  isLoading={disable}
                >
                  {t('signin')}
                </Button>
              </Box>
            </FormControl>
          </Box>
          <Box
            className="lg:bg-white flex align-middle justify-center xs:bg-transparent px-7 w-full"
            maxWidth={424}
            maxHeight={410}
          >
            <Image
              alt="adminlogin"
              src={'/adminLogin.svg'}
              width={346}
              height={304}
              className="lg:w-full xs:w-2/3"
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
