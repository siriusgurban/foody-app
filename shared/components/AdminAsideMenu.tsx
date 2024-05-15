import { Box, Button } from '@chakra-ui/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useTransition } from 'react'
import { useTranslation } from 'react-i18next'

function AdminAsideMenu() {
  const { push, asPath } = useRouter()
  const { t } = useTranslation('admin')

  const isActive = (path: string) => (asPath === path ? '#CD61ED' : 'none')

  return (
    <Box
      as="section"
      className="mt-4 bg-admin-aside w-64 rounded-xl h-96 p-5 xs:none sm:none"
    >
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
    </Box>
  )
}

export default AdminAsideMenu
