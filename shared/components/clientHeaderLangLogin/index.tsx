import React from 'react'
import AdminModalButton from '../adminModalButton'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { CLIENT } from '@/shared/constants/router'
import { Lang } from '@/shared/components/Lang'

const ClientHeaderLangLogin = () => {
  const { t } = useTranslation('client')
  const { push } = useRouter()
  return (
    <div className="flex items-center gap-5">
      <Lang bg="white" />
      <AdminModalButton
        className=" font-medium w-12/12  px-6 py-2 rounded-3xl   bg-client-main-red text-white shadow-md hover:scale-95 transition-all duration-500 hidden sm:block"
        text={t('Sign Up')}
        onClick={() => push(CLIENT.LOGIN)}
      />
    </div>
  )
}

export default ClientHeaderLangLogin
