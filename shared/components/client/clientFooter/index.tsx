import { Box, Heading, Image, Text } from '@chakra-ui/react'
import React from 'react'

function ClientFooter() {
  return (
    <>
      <Box
        bgColor="#181617"
        w="100%"
        mt="60px"
        h="385px"
        display="flex"
        justifyContent="center"
        gap="70px"
        pt="130px"
        as="footer"
        className="sm:ps-[60px] xs:ps-[60px]"
      >
        <Box display="flex" flexDir="column" justifyContent="flex-start">
          <Image src="/clientFooter/foody.svg" maxW="92px" maxH="32px" />
          <Text textColor="#828282" maxW="300px" mt="5px">
            Lorem ipsum is placeholder text commonly used in the graphic,
          </Text>
          <Box display="flex" gap="16px" mt="10px">
            <Box
              w="50px"
              h="50px"
              border="1px solid white"
              display="flex"
              justifyContent="center"
              alignItems="center"
              borderRadius="30px"
            >
              <Image src="/clientFooter/facebook.svg" w="43px"></Image>
            </Box>
            <Box
              w="50px"
              h="50px"
              bg="#FB9300"
              display="flex"
              justifyContent="center"
              alignItems="center"
              borderRadius="30px"
            >
              <Image src="/clientFooter/instagram.svg" w="30px"></Image>
            </Box>
            <Box
              w="50px"
              h="50px"
              border="1px solid white"
              display="flex"
              justifyContent="center"
              alignItems="center"
              borderRadius="30px"
            >
              <Image src="/clientFooter/twitter.svg" w="32px"></Image>
            </Box>
          </Box>
        </Box>
        <Box className="xl:flex gap-[100px] md:flex sm:hidden xs:hidden">
          <Box
            display="flex"
            flexDir="column"
            gap="10px"
            justifyContent="flex-start"
            mt="10px"
          >
            <a href="#">
              <Text
                fontSize="23px"
                textColor="white"
                fontWeight="900"
                fontFamily="Roboto"
              >
                Popular
              </Text>
            </a>
            <a href="#">
              <Text fontSize="16px" textColor="#BDBDBD" fontFamily="Roboto">
                Programming
              </Text>
            </a>
            <a href="#">
              <Text fontSize="16px" textColor="#BDBDBD" fontFamily="Roboto">
                Books for children
              </Text>
            </a>
            <a href="#">
              <Text fontSize="16px" textColor="#BDBDBD" fontFamily="Roboto">
                Psychology
              </Text>
            </a>
            <a href="#">
              <Text fontSize="16px" textColor="#BDBDBD" fontFamily="Roboto">
                Business
              </Text>
            </a>
          </Box>
          <Box
            display="flex"
            flexDir="column"
            gap="10px"
            justifyContent="flex-start"
          >
            <a href="#">
              <Text
                fontSize="23px"
                textColor="white"
                fontWeight="900"
                fontFamily="Roboto"
              >
                Cash
              </Text>
            </a>
            <a href="#">
              <Text fontSize="16px" textColor="#BDBDBD" fontFamily="Roboto">
                Delivery
              </Text>
            </a>
            <a href="#">
              <Text fontSize="16px" textColor="#BDBDBD" fontFamily="Roboto">
                Payment
              </Text>
            </a>
            <a href="#">
              <Text fontSize="16px" textColor="#BDBDBD" fontFamily="Roboto">
                About the store
              </Text>
            </a>
          </Box>
          <Box
            display="flex"
            flexDir="column"
            gap="10px"
            justifyContent="flex-start"
          >
            <a href="#">
              <Text
                fontSize="23px"
                textColor="white"
                fontWeight="900"
                fontFamily="Roboto"
              >
                Help
              </Text>
            </a>
            <a href="#">
              <Text fontSize="16px" textColor="#BDBDBD" fontFamily="Roboto">
                Contacts
              </Text>
            </a>
            <a href="#">
              <Text fontSize="16px" textColor="#BDBDBD" fontFamily="Roboto">
                Purchase returns
              </Text>
            </a>
            <a href="#">
              <Text fontSize="16px" textColor="#BDBDBD" fontFamily="Roboto">
                Buyer help
              </Text>
            </a>
          </Box>
        </Box>
      </Box>
      <Box bg="#181617" textAlign="center" textColor="white">
        <Text>
          All rights reserved © 2003-2022 Foody TERMS OF USE | Privacy Policy
        </Text>
      </Box>
    </>
  )
}

export default ClientFooter
