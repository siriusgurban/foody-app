import { Box, Button } from '@chakra-ui/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'

function AdminAsideMenu() {
  const { push, asPath } = useRouter()

  const isActive = (path: string) => (asPath === path ? '#CD61ED' : 'none')

  return (
    <Box
      as="section"
      className="mt-4 bg-admin-aside w-64 rounded-xl h-96 p-5 xs:none sm:none"
    >
      <Box as="ul" className="w-64 flex flex-col gap-2">
        <Button
          onClick={() => push('/admin')}
          className="flex gap-7 w-52 text-pink20 cursor-pointer hover:bg-admin-btnhover hover:w-52 "
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
          Dashboard
        </Button>
        <Button
          onClick={() => push('/admin/products')}
          className="flex gap-7 w-52 text-pink20 cursor-pointer hover:bg-admin-btnhover hover:w-52 "
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
          Products
        </Button>
        <Button
          onClick={() => push('/admin/restaurants')}
          className="flex gap-7 w-52 text-pink20 cursor-pointer hover:bg-admin-btnhover hover:w-52 "
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
          Restaurants
        </Button>
        <Button
          onClick={() => push('/admin/category')}
          className="flex gap-7 w-52 text-pink20 cursor-pointer hover:bg-admin-btnhover hover:w-52"
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
          Category
        </Button>
        <Button
          onClick={() => push('/admin/orders')}
          className="flex gap-7 w-52 text-pink20 cursor-pointer hover:bg-admin-btnhover hover:w-52"
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
          Orders
        </Button>
        <Button
          onClick={() => push('/admin/offer')}
          className="flex gap-7 w-52 text-pink20 cursor-pointer hover:bg-admin-btnhover hover:w-52"
          colorScheme="none"
          style={{
            justifyContent: 'flex-start',
            backgroundColor: isActive('/admin/offer'),
          }}
          as="li"
        >
          <Image
            width={18}
            alt="products"
            height={18}
            src="/adminasidemenu/offer.svg"
          />
          Offer
        </Button>
        <Button
          onClick={() => push('/admin/login')}
          className="flex gap-7 w-52 text-pink20 cursor-pointer hover:bg-admin-btnhover hover:w-52"
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
          Logout
        </Button>
      </Box>
    </Box>
  )
}

export default AdminAsideMenu
