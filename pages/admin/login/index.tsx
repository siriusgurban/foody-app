//@ts- nocheck

import React, { useEffect, useState } from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import {
  Button,
  FormControl,
  FormHelperText,
  Input,
  useToast,
} from '@chakra-ui/react'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { postAdmin } from '../../../shared/services/admin'

function Login() {
  const { t } = useTranslation('admin')
  const toast = useToast()
  const { push } = useRouter()

  const initialValues = {
    email: '',
    password: '',
  }

  const newPost = { email: 'admin@gmail.com', password: '123456' }

  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: postAdmin,
    onSuccess(data, variables, context) {
      console.log(data, variables, 'success')
    },
    onError(data, variables, context) {
      console.log(data, 'error')
    },
  })

  function handleForm() {
    const response = mutate(newPost)
    console.log('form handled', response)
    return response
  }

  // const { values, handleChange, handleSubmit, errors } = useFormik({
  //   initialValues,
  //   onSubmit: (values) => mutateAsync(values),
  //   validate: (form) => {
  //     const error = {}
  //     const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

  //     if (!form?.email?.trim()) {
  //       error.email = 'Require field'
  //     }

  //     if (!regEmail.test(form?.email?.trim())) {
  //       error.email = 'Enter correct email'
  //     }

  //     if (!form?.password?.trim()) {
  //       error.password = 'Require field'
  //     }

  //     return error
  //   },
  // })

  return (
    // <div className="bg-admin-bg h-lvh">
    //   {t('login')}
    //   <FormControl>
    //     <Input type="text" id="email" name="email" onChange={handleChange} />
    //     {errors?.email && (
    //       <FormHelperText color="red">{errors?.email}</FormHelperText>
    //     )}
    //     <Input
    //       type="password"
    //       id="password"
    //       name="password"
    //       onChange={handleChange}
    //     />

    //     {errors?.password && (
    //       <FormHelperText color="red">{errors?.password}</FormHelperText>
    //     )}
    //     <Button
    //       variant="danger"
    //       type="submit"
    //       className="w-100"
    //       onClick={handleSubmit}
    //     >
    //       Sign In
    //     </Button>
    //   </FormControl>
    // </div>
    <div>
      <button onClick={handleForm}>send</button>
    </div>
  )
}

export default Login

export async function getStaticProps({ locale }: { locale: any }) {
  return {
    props: { ...(await serverSideTranslations(locale, ['admin'])) },
  }
}
