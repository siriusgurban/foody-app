//@ts- nocheck

import React from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import ApexChart from './chart'

function HeaderAdmin() {
  const { locale, locales, push } = useRouter()
  const handleClick = (l: any) => () => {
    push('/admin', undefined, { locale: l })
  }

  const { t } = useTranslation('admin')

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
    </>
  )
}

export default HeaderAdmin
