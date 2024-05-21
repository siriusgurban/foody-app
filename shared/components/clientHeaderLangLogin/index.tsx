import React from 'react'
// import { Lang } from '../Lang'
import AdminModalButton from '../adminModalButton'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'

const clientHeaderLangLogin = () => {
    const { t } = useTranslation('admin')
    const navigate = useRouter()
    return (
        <div className='flex items-center'>
            {/* <Lang /> */}
            <AdminModalButton className=' font-medium w-12/12  px-6 py-2 rounded-3xl   bg-client-main-red text-white shadow-md hover:scale-95 transition-all duration-500 hidden sm:block' text={t('Sign up')} onClick={() => navigate.push("/login")} />
        </div>
    )
}

export default clientHeaderLangLogin