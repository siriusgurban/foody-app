import ClientFooter from "@/shared/components/clientFooter";
import ClientHeader from "@/shared/components/clientHeader";
import { Box, Text, Image } from "@chakra-ui/react";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const AboutUs = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <ClientHeader />
      <Box
        display={{ base: "block", md: "flex" }}
        justifyContent="space-evenly"
        maxW="1440px"
        width="100%"
        gap="100px"
        m="auto"
        pb="102px"
        pt="85px"
        flexWrap="wrap"
      >
        <Box
          className="leftSide"
          data-aos="fade-right"
          mb={{ base: "40px", md: "0" }}
        >
          <Text fontSize="45px" fontWeight="bold" mt="113px">
            About Us
          </Text>
          <Text maxW="565px" w="100%" fontSize="20px" mt="31px">
            Lorem ipsum is placeholder text commonly used in the graphic, print,
            and publishing industries for previewing layouts and visual mockups.
            Lorem ipsum is placeholder text commonly used in the graphic, print,
            and publishing industries for previewing layouts and visual text
            commonly used in the graphic, print, and publishing industries for
            previewing layouts and visual mockups.
          </Text>
        </Box>
        <Box
          className="rightSide"
          data-aos="fade-left"
          mb={{ base: "40px", md: "0" }}
        >
          <Image src="/aboutUs/rectangle.svg" pos="relative" />
          <Box
            className="leftCard"
            w="274px"
            h="174px"
            bg="#FFFFFF"
            pos="absolute"
            top="0"
            right="68px"
            borderRadius="20px"
            boxShadow="1px 1px 10px 0px black"
            data-aos="fade-left"
          >
            <Image
              src="/aboutUs/hamburger.svg"
              pos="absolute"
              right="30"
              top="-54"
            />
            <Text fontSize="22px" fontWeight="bold" ml="26px" mt="69px">
              Hamburger
            </Text>
            <Image src="/aboutUs/starGroup1.svg" ml="26px" mt="2px" />
            <Text fontWeight="bold" fontSize="20px" ml="26px" mt="13px">
              $5.90
            </Text>
          </Box>
          <Box
            className="card"
            w="274px"
            h="174px"
            bg="#FFFFFF"
            pos="absolute"
            top="220px"
            left="-10"
            borderRadius="20px"
            boxShadow="1px 1px 10px 0px black"
            data-aos="fade-left"
          >
            <Image
              src="/aboutUs/pizza.svg"
              pos="absolute"
              right="30"
              top="-54"
            />
            <Text fontSize="22px" fontWeight="bold" ml="26px" mt="69px">
              Sousage Pizza
            </Text>
            <Image src="/aboutUs/starGroup2.svg" ml="26px" mt="2px" />
            <Text fontWeight="bold" fontSize="20px" ml="26px" mt="13px">
              $7.90
            </Text>
          </Box>
          <Box
            className="rightCard"
            w="274px"
            h="174px"
            bg="#FFFFFF"
            pos="absolute"
            top="320px"
            right="0px"
            borderRadius="20px"
            boxShadow="1px 1px 10px 0px black"
            data-aos="fade-left"
          >
            <Image
              src="/aboutUs/soup.svg"
              pos="absolute"
              right="30"
              top="-54"
            />
            <Text fontSize="22px" fontWeight="bold" ml="26px" mt="69px">
              Tomato Soup
            </Text>
            <Image src="/aboutUs/starGroup3.svg" ml="26px" mt="2px" />
            <Text fontWeight="bold" fontSize="20px" ml="26px" mt="13px">
              $7.90
            </Text>
          </Box>
          <Box
            className="leftCard"
            w="274px"
            h="174px"
            bg="#FFFFFF"
            pos="absolute"
            bottom="40px"
            left="10px"
            borderRadius="20px"
            boxShadow="1px 1px 10px 0px black"
          >
            <Image
              src="/aboutUs/coffe.svg"
              pos="absolute"
              right="30"
              top="-54"
            />
            <Text fontSize="22px" fontWeight="bold" ml="26px" mt="69px">
              Papa Coffee
            </Text>
            <Image src="/aboutUs/starGroup4.svg" ml="26px" mt="2px" />
            <Text fontWeight="bold" fontSize="20px" ml="26px" mt="13px">
              $1.40
            </Text>
          </Box>
        </Box>
      </Box>
      <ClientFooter />
    </>
  );
};

export default AboutUs;
