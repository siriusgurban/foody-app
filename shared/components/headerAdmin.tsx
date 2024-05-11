//@ts- nocheck

import React from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { increment } from '../store/basketSlice/basketSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { Button, useToast } from '@chakra-ui/react'

function HeaderAdmin() {
  const { locale, locales, push } = useRouter()
  const handleClick = (l: any) => () => {
    push('/admin', undefined, { locale: l })
  }
  const toast = useToast()
  const { t } = useTranslation('admin')

  const count = useAppSelector((state) => state.basket.value)
  const dispatch = useAppDispatch()

  function Increase() {
    dispatch(increment())
  }

  return (
    <>
      <div className="flex flex-row justify-between">
        <div className="text-red">Foody</div>
        <div className="flex justify-center">
          <div>+ {t('add')}</div>
          <div>{t('product')}</div>
          <div>{t('login')}</div>
          <div>Admin</div>
          <h1 className="text-red-500">{locale}</h1>
        </div>
        {locales?.map((l) => {
          return (
            <button key={l} onClick={handleClick(l)}>
              {l}
            </button>
          )
        })}
      </div>

      <button onClick={Increase}>Increase</button>
      <p className="text-red-700">{count}</p>

      <Button
        onClick={() =>
          toast({
            title: 'Account created.',
            description: "We've created your account for you.",
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
        }
      >
        Show Toast
      </Button>
    </>
  )
}

export default HeaderAdmin
