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
  useEffect(() => {
    handleClose()
  }, [])

  console.log(isOpenState, 'asddd')

  const dispatch = useDispatch()

  function handleClose() {
    dispatch(isOpenFn(false))
    console.log('close')
  }

  const { isOpen, onOpen, onClose } = useDisclosure()
  //className="mt-4 w-64 rounded-xl p-5"

  return (
    <Drawer
      placement="left"
      onClose={onClose}
      isOpen={isOpenState}
      isFullHeight
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader borderBottomWidth="1px p-0" className="bg-admin-aside">
          <Box className="flex pt-4 ps-4 gap-4 ">
            <Image
              src={'/arrowBack.svg'}
              width={12}
              height={20}
              alt="arrow"
              onClick={handleClose}
              className="cursor-pointer"
            />
            <Foody role="admin" />
          </Box>
        </DrawerHeader>
        <DrawerBody className="bg-admin-aside">
          <Box as="ul" className="w-64 flex flex-col gap-2">
            <Button
              onClick={() => push('/admin')}
              className="flex gap-7 w-52 cursor-pointer hover:bg-admin-btnhover hover:w-52 "
              colorScheme="none"
              style={{
                justifyContent: 'flex-start',
                backgroundColor: isActive('/admin'),
              }}
              as="li"
            >
              <Image
                width={18}
                alt="products"
                height={18}
                src="/adminasidemenu/dashboard.svg"
              />
              {t('dashboard')}
            </Button>
            <Button
              onClick={() => push('/admin/products')}
              className="flex gap-7 w-52 cursor-pointer hover:bg-admin-btnhover hover:w-52 "
              colorScheme="none"
              style={{
                justifyContent: 'flex-start',
                backgroundColor: isActive('/admin/products'),
              }}
              as="li"
            >
              <Image
                width={18}
                alt="products"
                height={18}
                src="/adminasidemenu/products.svg"
              />
              {t('products')}
            </Button>
            <Button
              onClick={() => push('/admin/restaurants')}
              className="flex gap-7 w-52 cursor-pointer hover:bg-admin-btnhover hover:w-52 "
              colorScheme="none"
              style={{
                justifyContent: 'flex-start',
                backgroundColor: isActive('/admin/restaurants'),
              }}
              as="li"
            >
              <Image
                width={18}
                alt="products"
                height={18}
                src="/adminasidemenu/restaurants.svg"
              />
              {t('restaurants')}
            </Button>
            <Button
              onClick={() => push('/admin/category')}
              className="flex gap-7 w-52 cursor-pointer hover:bg-admin-btnhover hover:w-52"
              colorScheme="none"
              style={{
                justifyContent: 'flex-start',
                backgroundColor: isActive('/admin/category'),
              }}
              as="li"
            >
              <Image
                width={18}
                alt="products"
                height={18}
                src="/adminasidemenu/category.svg"
              />
              {t('category')}
            </Button>
            <Button
              onClick={() => push('/admin/orders')}
              className="flex gap-7 w-52 cursor-pointer hover:bg-admin-btnhover hover:w-52"
              colorScheme="none"
              style={{
                justifyContent: 'flex-start',
                backgroundColor: isActive('/admin/orders'),
              }}
              as="li"
            >
              <Image
                width={18}
                alt="products"
                height={18}
                src="/adminasidemenu/orders.svg"
              />
              {t('orders')}
            </Button>
            <Button
              onClick={() => push('/admin/offers')}
              className="flex gap-7 w-52 cursor-pointer hover:bg-admin-btnhover hover:w-52"
              colorScheme="none"
              style={{
                justifyContent: 'flex-start',
                backgroundColor: isActive('/admin/offers'),
              }}
              as="li"
            >
              <Image
                width={18}
                alt="products"
                height={18}
                src="/adminasidemenu/offer.svg"
              />
              {t('offers')}
            </Button>
            <Button
              onClick={() => push('/admin/login')}
              className="flex gap-7 w-52 cursor-pointer hover:bg-admin-btnhover hover:w-52"
              colorScheme="none"
              style={{
                justifyContent: 'flex-start',
                backgroundColor: isActive('/admin/login'),
              }}
              as="li"
            >
              <Image
                width={18}
                alt="products"
                height={18}
                src="/adminasidemenu/logout.svg"
              />
              {t('logout')}
            </Button>
          </Box>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

export default AdminAsideMenuResponsive
