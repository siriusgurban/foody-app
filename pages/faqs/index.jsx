import React, { useState } from 'react'
import ClientLayout from '@/shared/components/clientLayout'
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Text,
  useMediaQuery,
} from '@chakra-ui/react'
import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const truncateText = (text, maxLength) => {
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
}

const Faqs = () => {
  const [isMobile] = useMediaQuery('(max-width: 768px)')
  const [openItems, setOpenItems] = useState({ 0: true })

  const faqs = [
    'How to contact with Customer Service?',
    'App installation failed, how to update system information?',
    'Website response taking time, how to improve?',
    'How do I create an account?',
    'Website response taking time, how to improve?',
  ]

  const handleToggle = (index) => {
    setOpenItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  return (
    <>
      <ClientLayout>
        <Box
          display="flex"
          justifyContent="center"
          flexDirection="column"
          textAlign="center"
          className="px-2.5 md:px-0"
        >
          <Text fontSize="36px" fontWeight="bold" pb="41px">
            F.A.Q
          </Text>
          <Box display="flex" justifyContent="center">
            <Accordion
              defaultIndex={[0]}
              allowMultiple
              display="flex"
              flexDir="column"
              gap="10px"
              maxW="1400px"
              width="100%"
              borderRadius="30px"
            >
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  boxShadow="1px 1px 5px 0px black"
                  onClick={() => handleToggle(index)}
                >
                  <h2>
                    <AccordionButton>
                      <Box
                        as="span"
                        flex="1"
                        textAlign="start"
                        fontSize="20px"
                        fontWeight="bold"
                        pt="15px"
                        pb="15px"
                        pl="25px"
                      >
                        {isMobile ? truncateText(faq, 28) : faq}
                      </Box>
                      {openItems[index] ? <MinusIcon /> : <AddIcon />}
                    </AccordionButton>
                  </h2>
                  <AccordionPanel
                    pb={4}
                    maxWidth="802px"
                    textAlign="start"
                    textColor="#828282"
                    fontSize="15px"
                    fontWeight="bold"
                    pt="20px"
                    pl="38px"
                  >
                    Our Customer Experience Team is available 7 days a week and
                    we offer 2 ways to get in contact. Email and Chat. We try to
                    reply quickly, so you need not to wait too long for a
                    response!.
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </Box>
        </Box>
      </ClientLayout>
    </>
  )
}

export default Faqs

export async function getStaticProps({ locale }) {
  return {
    props: { ...(await serverSideTranslations(locale, ['client'])) },
  }
}
