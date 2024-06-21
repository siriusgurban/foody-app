import { Box, Text, Image, Input, Button, Flex } from "@chakra-ui/react";
import React from "react";

function UserProfile() {
  return (
    <>
      <Box w="100%" margin="auto" bg="#F3F4F6" pt="41px" pl="37px" pb="95px">
        <Text textColor="#4F4F4F" fontSize="30px" fontWeight="600" textAlign="start">
          Profile
        </Text>
        <Box w="100%" m="auto" display="flex" justifyContent="center">
          <Box w="146px" h="141px" bg="white" display="flex" justifyContent="center" alignItems="center" borderRadius="400px" flexDir="column">
            <Image src="/userProfile/cloud.svg" />
            <Text lineHeight="24px" fontWeight="500" fontSize="18px" textColor="#929292">
              upload
            </Text>
          </Box>
        </Box>
        <Box w="100%" mt="20px" display="flex" flexDir="column" alignItems="center">
          <Flex mb="15px" w="80%" justifyContent="space-between">
            <Box flex="1" mr="10px">
              <Text mb="8px" textColor="#4F4F4F">Contact</Text>
              <Input placeholder="+994" bg="white" />
            </Box>
            <Box flex="1" ml="10px">
              <Text mb="8px" textColor="#4F4F4F">Email</Text>
              <Input placeholder="rahimlisarkhan@gmail.com" bg="white" />
            </Box>
          </Flex>
          <Flex mb="15px" w="80%" justifyContent="space-between">
            <Box flex="1" mr="10px">
              <Text mb="8px" textColor="#4F4F4F">Username</Text>
              <Input placeholder="rahimlisarkhan" bg="white" />
            </Box>
            <Box flex="1" ml="10px">
              <Text mb="8px" textColor="#4F4F4F">Address</Text>
              <Input placeholder="Ataturk 45 Ganclik Baku" bg="white" />
            </Box>
          </Flex>
          <Flex mb="15px" w="80%" justifyContent="space-between">
            <Box flex="1" mr="10px">
              <Text mb="8px" textColor="#4F4F4F">Full Name</Text>
              <Input placeholder="Sarkhan Rahimli" bg="white" />
            </Box>
            <Box flex="1" ml="10px" display="flex" alignItems="flex-end">
              <Button colorScheme="green" w="100%">Save</Button>
            </Box>
          </Flex>
        </Box>
      </Box>
    </>
  );
}

export default UserProfile;
