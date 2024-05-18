//@ts- nocheck

import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Foody from '../foody'
import { useDispatch, useSelector } from 'react-redux'
import { isOpenFn } from '../../store/responsiveSlice/asideMenuSlice'
import { useAppSelector } from '../../store/hooks'
import { useTranslation } from 'react-i18next'
import AdminAsideMenu from '../AdminAsideMenu'

function AdminAsideMenuResponsive() {
  const { push, asPath } = useRouter()
  const { t } = useTranslation('admin')

  const isActive = (path: string) => (asPath === path ? '#CD61ED' : 'none')

  const isOpenState = useAppSelector((state) => state.asideMenu.value)
  const [state, setState] = useState<boolean>()
  // useEffect(() => {
  //   const isOpenFn = () => (isOpenState ? '' : 'hidden')
  //   setState(isOpenFn)
  // }, [isOpenState])

  console.log(isOpenState, 'asddd')

  const dispatch = useDispatch()

  function handleClose() {
    dispatch(isOpenFn(isOpenState))
    console.log('close')
  }

  const { isOpen, onOpen, onClose } = useDisclosure()
  {
    console.log(isOpen, 'aaaaaaaaa')
  }
  //className="mt-4 w-64 rounded-xl p-5"

  return (
    <Box as="section">
      {/* <Box className="flex gap-5 my-auto ">
        <Image
          src={'/hamburgerMenu.svg'}
          width={20}
          height={14}
          alt="hamburgerMenu"
          className="cursor-pointer"
          //   className="lg:hidden xl:hidden xs:flex sm:flex"
          onClick={onOpen}
        />
        <Foody role="admin" />
      </Box> */}
      <Drawer placement="left" onClose={onClose} isOpen={isOpen} isFullHeight>
        <DrawerOverlay />
        <DrawerContent className="w-64">
          <DrawerHeader borderBottomWidth="1px p-0" className="bg-admin-aside">
            <Box className="flex pt-4 ps-4 gap-4 ">
              <Image
                src={'/arrowBack.svg'}
                width={12}
                height={20}
                alt="arrow"
                onClick={onClose}
                className="cursor-pointer"
              />
              <Foody role="admin" />
            </Box>
          </DrawerHeader>
          <DrawerBody className="bg-admin-aside">
            <AdminAsideMenu />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  )
}

export default AdminAsideMenuResponsive
