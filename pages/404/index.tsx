import ClientHeader from "@/shared/components/clientHeader";
import React from "react";
import { Box, Image } from "@chakra-ui/react";

function NotFound() {
  return (
    <>
      <Box bgColor="#F7F7F7">
        <ClientHeader />

        <Box alignContent="center">
          <Image src="/404Page/404Page.svg" m="auto" maxWidth="1440px" />
        </Box>
      </Box>
    </>
  );
}

export default NotFound;
