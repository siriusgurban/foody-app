import {
  Box,
  Image,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Flex,
  Input,
  Textarea,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getProducts } from "../services/products";

const defaultImageUrl = "/locales/pizza.svg";

function AdminProductsSide() {
  const [products, setProducts] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        if (response && response.data && response.data.result) {
          setProducts(response.data.result.data);
        } else {
          console.error(
            "Error fetching products: Response format is incorrect."
          );
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleDeleteClick = (productId) => {
    setDeleteProductId(productId);
    onOpen();
  };

  const handleDeleteConfirm = () => {
    // Implement delete logic here using deleteProductId
    console.log("Deleting product with ID:", deleteProductId);
    onClose();
  };

  return (
    <>
      <Box>
        <Box
          className="headBox bg-admin-secondary"
          w="1124px"
          h="73px"
          mt="16px"
          borderRadius="10"
          display="flex"
          justifyContent="space-between"
        >
          <Text ml="33px" mt="26px" textColor="#C7C7C7">
            Products
          </Text>
          <Accordion
            defaultIndex={[0]}
            allowMultiple
            bg="#5A5B70"
            w="199px"
            h="35px"
            mr="52px"
            mt="20px"
            border="none"
            borderRadius="30"
            textAlign="center"
          >
            <AccordionItem>
              <h2>
                <AccordionButton color="#C7C7C7">
                  <Box as="span" flex="1" textAlign="left" textColor="#C7C7C7">
                    Resturant type
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}></AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Box>

        <Box display="flex" gap="40px" flexWrap="wrap">
          {products.map((product, index) => (
            <Box
              key={index}
              className="productCards"
              w="196px"
              bg="white"
              mt="52px"
              pb="12px"
              display="flex"
              flexDir="column"
              justifyContent="space-evenly"
              borderRadius="5"
            >
              <Image
                alt={product.name}
                src={defaultImageUrl}
                ml="auto"
                mr="auto"
                mt="15px"
              />
              <Box className="texts" ml="17px">
                <Text fontSize="18px" fontFamily="Roboto" fontWeight="500">
                  {product.description}
                </Text>
                <Text
                  fontSize="14px"
                  fontFamily="Roboto"
                  fontWeight="500"
                  textColor="#8E8E93"
                >
                  {product.name}
                </Text>
              </Box>
              <Box display="flex" ml="17px" gap="80px" mt="5px">
                <Text
                  fontSize="12px"
                  fontFamily="Roboto"
                  fontWeight="500"
                  textColor="#00B2A9"
                >
                  ${product.price}
                </Text>
                <Box display="flex" gap="12px" alignItems="center">
                  <Text
                    onClick={() => handleDeleteClick(product.id)}
                    cursor="pointer"
                  >
                    <img src="/locales/garbage.svg" alt="delete" />
                  </Text>
                  <Text onClick={() => setDrawerOpen(true)} cursor="pointer">
                    <img src="/locales/pen.svg" alt="edit" />
                  </Text>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      <Drawer
        placement="right"
        onClose={() => setDrawerOpen(false)}
        isOpen={isDrawerOpen}
        size="xl"
      >
        <DrawerOverlay />
        <DrawerContent bg="#38394E">
          <DrawerCloseButton bg="#C74FEB" color="#F2F2F2" borderRadius="30px" />
          <Box className="mainDrawyer" display="flex" gap="73px">
            <Box className="leftSide" display="flex" flexDir="column">
              <Text
                textColor="#C7C7C7"
                mt="30px"
                ml="35px"
                fontSize="22px"
                lineHeight="24px"
              >
                Edit Product
              </Text>
              <Text
                textColor="#C7C7C7"
                mt="10px"
                ml="35px"
                fontSize="16px"
                lineHeight="24px"
              >
                Upload your product image
              </Text>
              <Box ml="31px" mt="5px">
                <img
                  src={defaultImageUrl}
                  alt=""
                  width="124px"
                  height="117.21px"
                />
              </Box>
              <Text maxW="220px" ml="31px" mt="70px" textColor="#C7C7C7">
                Edit your Product description and necessary information
              </Text>
            </Box>
            <Box className="rightSide" display="flex" flexDir="column">
              <Box
                className="uploadImg"
                textAlign="center"
                display="flex"
                flexDir="column"
                gap="5px"
                w="526px"
                mt="40px"
                justifyContent="center"
                height="122px"
                alignItems="center"
                borderRadius="20px"
                bg="#43445A"
                cursor="pointer"
              >
                <img
                  src="/locales/cloud.svg"
                  alt="upload_image"
                  width="60px"
                  height="40px"
                />
                <Text textColor="#C7C7C7">upload</Text>
              </Box>
              <Box
                className="form"
                display="flex"
                flexDir="column"
                pt="22px"
                pb="36px"
                width="526px"
                bg="#43445A"
                textAlign="start"
                borderRadius="20px"
                mt="70px"
              >
                <Text ml="28px" textColor="#C7C7C7">
                  Name
                </Text>
                <Input
                  placeholder="Marqarita"
                  bg="#5A5B70"
                  border="none"
                  textColor="#F2F2F2"
                  maxW="474px"
                  m="auto"
                  mt="8px"
                />
                <Text mt="26px" ml="28px" textColor="#C7C7C7">
                  Description
                </Text>
                <Textarea
                  placeholder="16.Description food"
                  bg="#5A5B70"
                  border="none"
                  textColor="#F2F2F2"
                  maxW="474px"
                  m="auto"
                  mt="8px"
                  h="133px"
                />
                <Text mt="10px" ml="28px" textColor="#C7C7C7">
                  Price
                </Text>
                <Input
                  placeholder="$16.90"
                  bg="#5A5B70"
                  border="none"
                  textColor="#F2F2F2"
                  maxW="474px"
                  m="auto"
                  mt="8px"
                />
                <Text mt="14px" ml="28px" textColor="#C7C7C7">
                  Restaurants
                </Text>
                <Box mt="18px">
                  <Accordion
                    defaultIndex={[0]}
                    allowMultiple
                    bg="#5A5B70"
                    w="478px"
                    h="46px"
                    m="auto"
                    border="none"
                    borderRadius="20px"
                    textAlign="center"
                  >
                    <AccordionItem
                      bg="#5A5B70"
                      w="478px"
                      h="46px"
                      m="auto"
                      border="none"
                      borderRadius="20px"
                      textAlign="center"
                    >
                      <h2>
                        <AccordionButton color="#989FAC">
                          <Box
                            as="span"
                            flex="1"
                            textAlign="left"
                            textColor="#989FAC"
                          >
                            Papa John’s
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}></AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box display="flex" gap="44px" justifyContent="center" mt="30px">
            <Button colorScheme="#38394E" maxW="350px" width="100%" borderRadius="15px" bg="#38394E" textColor="#FFFFFF" boxShadow="3px 5px 5px 5px #354E51">Cancel</Button>
            <Button colorScheme="#C035A2" maxW="350px" width="100%" borderRadius="15px" bg="#C035A2" textColor="#FFFFFF">Update  Product</Button>
          </Box>
        </DrawerContent>
      </Drawer>

      <AlertDialogExample
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
}

function AlertDialogExample({ isOpen, onClose, onConfirm }) {
  const cancelRef = React.useRef();

  return (
    <>
      <Box>
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent textAlign="center" mt="300px">
              <AlertDialogHeader fontSize="24px" fontWeight="bold">
                Are you sure it's deleted?
              </AlertDialogHeader>

              <AlertDialogBody
                fontSize="20px"
                maxW="350px"
                display="flex"
                margin="auto"
              >
                Attention! If you delete this product, it will not come back...
              </AlertDialogBody>

              <AlertDialogFooter display="flex" justifyContent="center">
                <Button ref={cancelRef} onClick={onClose} w="106px">
                  Cancel
                </Button>
                <Button colorScheme="red" onClick={onConfirm} ml={3} w="106px">
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </Box>
    </>
  );
}

export default AdminProductsSide;
