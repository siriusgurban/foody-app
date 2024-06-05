import ClientHeader from '@/shared/components/clientHeader'
import React from 'react'
import { Box, Image } from '@chakra-ui/react'
import ClientFooter from '@/shared/components/clientFooter'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

function NotFound() {
  return (
    <>
      <Box bgColor="#F7F7F7">
        <ClientHeader />

        <Box alignContent="center">
          <Image
            src="/404Page/404Page.svg"
            m="auto"
            maxWidth="1440px"
            width="100%"
          />
        </Box>
        <ClientFooter />
      </Box>
    </>
  )
}

export default NotFound

export async function getStaticProps({ locale }: { locale: any }) {
  return {
    props: { ...(await serverSideTranslations(locale, ['client'])) },
  }
}
