
import ClientFooter from "@/shared/components/clientFooter";
import ClientHeader from "@/shared/components/clientHeader";
import { Box, Text, Image } from "@chakra-ui/react";
import React from "react";

const HowItWorks = () => {
  return (
    <>
      <ClientHeader />
      <Box display="flex" justifyContent="center" flexDir="column">
        <Text fontSize="45px" fontWeight="bold" textAlign="center">
          How it works
        </Text>
        <Text fontSize="20px" textAlign="center" maxW="1040px" width="100%" m="auto" mt="20px" textColor="#828282" fontWeight="bold">
          Delivery may be extended during sale periods. Please refer to the
          checkout page for an updated estimate for your location. Kindly note
          that once you have placed an order, it is no longer possible to modify
          your order. Taxes and duties are included in all product prices.It is
          possible to place an order with shipment to a different address than
          your home or billing address when paying with a credit card. Please
          note that Klarna payments require that your order is shipped to your
          registered home address.
        </Text>
        <Box m="auto" position="relative" display="flex" justifyContent="center" alignItems="center" mt="51px">
            <Image src="/howItWorks/backRectangle.svg" />
            <Image src="/howItWorks/picture.svg" position="absolute" top="-75"/>
        </Box>
      </Box>
      <ClientFooter />
    </>
  );
};

export default HowItWorks;
