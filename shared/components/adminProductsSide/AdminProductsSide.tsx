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
import React, { useEffect, useRef, useState } from "react";
import { getProducts } from "../../services/products";
import { useTranslation } from "react-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import DeleteModal from "../deleteModal";
import AdminSecondaryComponent from "../adminSecondaryComponent";
import AdminModalDropdown from "../adminModalDropdown";
import AdminModalButton from "../adminModalButton";
import { AddIcon } from "@chakra-ui/icons";

// const leastDestructiveRef = useRef<HTMLButtonElement | null>(null)

const defaultImageUrl = "/adminproducts/pizza.svg";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

function AdminProductsSide() {
  const { t } = useTranslation("admin");

  const [products, setProducts] = useState<Product[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deleteProductId, setDeleteProductId] = useState<number | null>(null);
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

  const handleDeleteClick = (productId: number) => {
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
        <div className="  bg-admin-secondary rounded-2xl flex flex-col sm:flex-row justify-between items-center p-5 mt-5">
          <div className="   text-admin-secondary-heading text-xl  font-medium  ">
            {t(`products`)}
          </div>
          <div className="mt-3 sm:mt-0 flex flex-col items-center   sm:flex-row gap-5 ">
            <AdminModalDropdown
              p={""}
              className=" flex  width-200  gap-3 "
              classNameSelect=" rounded-2xl  py-2   px-2   bg-admin-input  rounded-2xl font-medium text-base  text-admin-secondary-heading    w-[170px] overflow-x-auto"
            />

            <AdminModalButton className="text-admin-secondary-add bg-admin-add-button-bg text-sm px-4 py-2  rounded-sm  font-bold  sm:rounded-2xl flex gap-2 align-middle">
              <Image src="/adminproducts/search.svg" />

              {t(`search`)}
            </AdminModalButton>
          </div>
        </div>

        <Box display="flex" gap="40px" flexWrap="wrap" justifyContent="center">
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
                    <img src="/adminproducts/garbage.svg" alt="delete" />
                  </Text>
                  <Text onClick={() => setDrawerOpen(true)} cursor="pointer">
                    <img src="/adminproducts/pen.svg" alt="edit" />
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
                  src="/adminproducts/cloud.svg"
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
                    w="474px"
                    h="35px"
                    border="none"
                    m="auto"
                    borderRadius="30"
                    textAlign="center"
                  >
                    <AccordionItem>
                      <h2>
                        <AccordionButton color="#C7C7C7">
                          <Box
                            as="span"
                            flex="1"
                            textAlign="left"
                            textColor="#C7C7C7"
                          >
                            Resturant type
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
        </DrawerContent>
      </Drawer>

      <DeleteModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}

export default AdminProductsSide;
