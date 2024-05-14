import { Box } from '@chakra-ui/react'
import Image from 'next/image'
import React, { useState } from 'react'
import Foody from './foody'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { isOpenFn } from '../store/responsiveSlice/asideMenuSlice'

function AdminHeader() {
  const { t } = useTranslation('admin')

  const dispatch = useDispatch()

  function handleOpen() {
    console.log('cliked')
    dispatch(isOpenFn())
  }

  return (
    <Box className="flex justify-between align-middle bg-admin-secondary rounded-b-lg h-16 px-5 w-full">
      <Box className="flex gap-5 my-auto ">
        <Image
          src={'/hamburgerMenu.svg'}
          width={20}
          height={14}
          alt="hamburgerMenu"
          className="cursor-pointer"
          //   className="lg:hidden xl:hidden xs:flex sm:flex"
          onClick={handleOpen}
        />
        <Foody role="admin" />
      </Box>
      <Box className="flex gap-5 my-auto">
        <button className="rounded-full bg-admin-btn font-bold px-3 text-white text-xs">
          + <span className="xs:hidden sm:hidden">{t('addproduct')}</span>
        </button>
        <button>
          <Image src={'/languages/en.svg'} width={41} height={41} alt="en" />
        </button>
        <button>
          {' '}
          <Image
            src={'/adminLogo.svg'}
            width={41}
            height={41}
            alt="adminLogo"
          />
        </button>
      </Box>
    </Box>
  )
}

export default AdminHeader
