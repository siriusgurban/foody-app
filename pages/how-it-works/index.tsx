import ClientFooter from '@/shared/components/clientFooter'
import ClientHeader from '@/shared/components/clientHeader'
import { Box, Text, Image, useMediaQuery } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import ClientLayout from '@/shared/components/clientLayout'

const HowItWorks: React.FC = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 })
  }, [])

  const [isMobile] = useMediaQuery('(max-width: 768px)')

  return (
    <>
      <ClientLayout>
        <Box display="flex" justifyContent="center" flexDir="column">
          <Box
            display="flex"
            justifyContent="center"
            flexDir="column"
            data-aos="fade-down"
          >
            <Text fontSize="45px" fontWeight="bold" textAlign="center">
              How it works
            </Text>
            <Text
              fontSize="20px"
              textAlign="center"
              maxW="1040px"
              width="100%"
              m="auto"
              mt="20px"
              textColor="#828282"
              fontWeight="bold"
              lineHeight={isMobile ? '35px' : 'initial'}
              padding={isMobile ? '0 24px' : '0'}
            >
              {isMobile
                ? 'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.'
                : 'Delivery may be extended during sale periods. Please refer to the checkout page for an updated estimate for your location. Kindly note that once you have placed an order, it is no longer possible to modify your order. Taxes and duties are included in all product prices. It is possible to place an order with shipment to a different address than your home or billing address when paying with a credit card. Please note that Klarna payments require that your order is shipped to your registered home address.'}
            </Text>
          </Box>
          <Box
            data-aos="zoom-in"
            data-aos-delay="300"
            style={{ display: 'none' }}
          ></Box>
          <Box data-aos="fade-up">
            <Box
              m="auto"
              position="relative"
              display="flex"
              justifyContent="center"
              alignItems="center"
              mt="51px"
            >
              <Image
                src={
                  isMobile
                    ? '/howItWorks/backRectangle2.svg'
                    : '/howItWorks/backRectangle.svg'
                }
              />
              <Image
                src="/howItWorks/picture.svg"
                position="absolute"
                top={isMobile ? 'auto' : '-75px'}
                maxW={isMobile ? '292px' : 'none'}
              />
            </Box>
          </Box>
          <Box
            data-aos="zoom-in"
            data-aos-delay="300"
            style={{ display: 'none' }}
          ></Box>
        </Box>
      </ClientLayout>
    </>
  )
}

export default HowItWorks

export async function getStaticProps({ locale }: { locale: any }) {
  return {
    props: { ...(await serverSideTranslations(locale, ['client'])) },
  }
}
