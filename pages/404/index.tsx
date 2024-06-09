import React from 'react'
import { Box, Image } from '@chakra-ui/react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import ClientLayout from '@/shared/components/layout/clientLayout'

function NotFound() {
  return (
    <>
      <ClientLayout>
        <Box alignContent="center">
          <Image
            src="/404Page/404Page.svg"
            m="auto"
            maxWidth="1440px"
            width="100%"
            alt="404"
          />
        </Box>
      </ClientLayout>
    </>
  )
}

export default NotFound

export async function getStaticProps({ locale }: { locale: any }) {
  return {
    props: { ...(await serverSideTranslations(locale, ['client'])) },
  }
}
