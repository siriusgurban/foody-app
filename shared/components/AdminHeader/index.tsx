import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import Image from 'next/image'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { isOpenFn } from '../../store/responsiveSlice/asideMenuSlice'
import { Lang } from '../Lang'
import { useAppSelector } from '../../store/hooks'
import Foody from '../foody'

function AdminHeader() {
  const { t } = useTranslation('admin')
  // const { isOpen, onOpen, onClose } = useDisclosure()
  const isOpenState = useAppSelector((state) => state.asideMenu.value)

  const dispatch = useDispatch()

  function handleOpen() {
    console.log('cliked', isOpenState)
    dispatch(isOpenFn(true))
  }

  return (
    <Box className="flex justify-between align-middle bg-admin-secondary rounded-b-lg h-16 px-5 w-full">
      <Box className="flex gap-5 my-auto ">
        <Image
          src={'/hamburgerMenu.svg'}
          width={20}
          height={14}
          alt="hamburgerMenu"
          className="md:hidden lg:hidden xl:hidden cursor-pointer"
          onClick={handleOpen}
        />
        <Foody role="admin" />
      </Box>
      <Box className="flex gap-5 my-auto">
        <button className="rounded-full bg-admin-btn font-bold px-3 text-white text-xs">
          + <span className="hidden md:inline-block">{t('addproduct')}</span>
        </button>
        <Lang />
        <button>
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
