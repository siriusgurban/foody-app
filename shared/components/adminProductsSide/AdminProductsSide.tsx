//@ts-nocheck
import { Box, Image, Text, useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../../services/products";
import { useTranslation } from "react-i18next";
import DeleteModal from "../deleteModal";
import AdminModalDropdown from "../adminModalDropdown";
import AdminModalButton from "../adminModalButton";
import { useQuery } from "@tanstack/react-query";
import { getRestuarants } from "@/shared/services/restaurants";

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
  const [rest, setRest] = useState();

  const { data } = useQuery({
    queryFn: getRestuarants,
    queryKey: ["restuarants"],
  });

  function handleRestaurant(id) {
    let RestName = data?.data?.result?.data.find((item, index) =>
      id == item?.id 
    );

    return RestName?.name;
  }

  console.log(data?.data?.result?.data, "restaurant");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        if (response && response.data && response.data.result) {
          setProducts(response.data.result.data);
          console.log("API dan gelenler:", response.data.result.data);
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

  const deleteProductById = async (productId: number) => {
    try {
      await deleteProduct(productId);
      console.log(`Product with ID ${productId} deleted`);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleDeleteConfirm = async () => {
    if (deleteProductId !== null) {
      console.log("Deleting product with ID:", deleteProductId);
      await deleteProductById(deleteProductId);
      setProducts(products.filter((product) => product.id !== deleteProductId));
      onClose();
    }
  };

  return (
    <>
      <Box width="100%" className="h-screen">
        <div className="bg-admin-secondary rounded-2xl flex flex-col sm:flex-row justify-between items-center p-5 mt-5">
          <div className="text-admin-secondary-heading text-xl font-medium">
            {t(`products`)}
          </div>
          <div className="mt-3 sm:mt-0 flex flex-col items-center sm:flex-row gap-5">
            <AdminModalDropdown
              p={""}
              className="flex width-200 gap-3"
              classNameSelect="rounded-2xl py-2 px-2 bg-admin-input font-medium text-base text-admin-secondary-heading w-[170px] overflow-x-auto"
            />
            <AdminModalButton className="text-admin-secondary-add bg-admin-add-button-bg text-sm px-4 py-2 rounded-sm font-bold sm:rounded-2xl flex gap-2 align-middle">
              <Image src="/adminproducts/search.svg" />
              {t(`search`)}
            </AdminModalButton>
          </div>
        </div>

        <Box display="flex" gap="40px" flexWrap="wrap" justifyContent="start">
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
                src={product.img_url}
                ml="auto"
                mr="auto"
                mt="15px"
              />
              <Box className="texts" ml="17px">
                <Text fontSize="18px" fontFamily="Roboto" fontWeight="500">
                  {product?.name}
                </Text>
                <Text
                  fontSize="14px"
                  fontFamily="Roboto"
                  fontWeight="500"
                  textColor="#8E8E93"
                >
                  {handleRestaurant(product?.rest_id)}
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

      <DeleteModal
        isOpen={isOpen}
        onClose={onClose}
        handleDeleteConfirm={handleDeleteConfirm}
      />
    </>
  );
}

export default AdminProductsSide;
