import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
  Text,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react'
import Image from 'next/image'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { isOpenFn } from '../../../store/responsiveSlice/asideMenuSlice'
import { Lang } from '../../common/Lang'
import { useAppSelector } from '../../../store/hooks'
import Foody from '../../common/foody'
import AdminAddModalCategory from '../adminAddModalCategory'
import AdminAddModalProduct from '../adminAddModalProduct'
import AdminUpdateModalProduct from '../adminUpdateModalProduct'
import { useQuery } from '@tanstack/react-query'
import { getUser } from '@/shared/services/admin'

function AdminHeader() {
  const { t } = useTranslation('admin')
  // const { isOpen, onOpen, onClose } = useDisclosure()
  const isOpenState = useAppSelector((state) => state.asideMenu.value)
  const [hideModalAddPro, setHideModalAddPro] = useState<boolean>(true)

  const dispatch = useDispatch()

  function handleOpen() {
    console.log('cliked', isOpenState)
    dispatch(isOpenFn(true))
  }

  function showHideModalAdd() {
    setHideModalAddPro((prev) => !prev)
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
      <AdminAddModalProduct
        onClickClose={showHideModalAdd}
        show={hideModalAddPro}
        text={t('addproduct')}
      />
      <Box className="flex gap-5 my-auto">
        <button
          className="rounded-full bg-admin-btn font-bold px-3 text-white text-xs min-w-10"
          onClick={showHideModalAdd}
        >
          + <span className="hidden  md:inline-block">{t('addproduct')}</span>
        </button>

        <Lang />
        <Tooltip>
          <button className="hidden sm:inline-block">
            <Image
              src={'/adminLogo.svg'}
              width={41}
              height={41}
              alt="adminLogo"
            />
          </button>
        </Tooltip>
      </Box>
    </Box>
  )
}

export default AdminHeader
