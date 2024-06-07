import AdminAsideMenu from '@/shared/components/AdminAsideMenu';
import AdminAsideMenuResponsive from '@/shared/components/AdminAsideMenuResponsive';
import AdminHeader from '@/shared/components/AdminHeader';
import { Box, Button, Toast, useDisclosure, ButtonGroup, IconButton } from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from "framer-motion";
import { ViewIcon, DeleteIcon } from '@chakra-ui/icons';
import { DeleteOrder, GetOrders } from '@/shared/services/order';
import AdminSecondaryComponent from '@/shared/components/adminSecondaryComponent';
import { shortText } from "@/shared/helpers/shortText";
import { ScrollBarContainer } from "@/shared/components/Scroll/scroll";
import Image from 'next/image';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';

interface Order {
  id: string;
  customer_id: string;
  created: string;
  delivery_address: string;
  amount: number;
  payment_method: number;
  contact: string;
  products: Array<{
    id: string;
    img_url: string;
    name: string;
    price: number;
    count: number;
  }>;
}

interface GetOrdersResponse {
  result: {
    data: Order[];
  };
}

function Orders() {
  const { t } = useTranslation('admin');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const queryClient = useQueryClient();
  const { data } = useQuery<GetOrdersResponse>({
    queryFn: GetOrders,
    queryKey: ['orders'],
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  const openModal = (order: Order) => {
    setSelectedOrder(order);
    onOpen();
  };

  const { mutate } = useMutation({
    mutationFn: DeleteOrder,
    onSuccess: () => {
      Toast({
        title: 'Order deleted',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
    onError: (error) => {
      console.error(error);
      Toast({
        title: 'Error deleting order',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    },
  });

  const handleDelete = (id: string) => {
    mutate(id);
  };

  const orderData = data?.result?.data;

  return (
    <>
      <div>
        <Head>
          <title>Admin | {t('orders')}</title>
          <link rel="icon" href="/admin6024190.png" />
        </Head>

        <Box className="bg-admin-bg h-lvh">
          <Box className="max-w-[1440px] mx-auto">
            <AdminHeader />
            <Box className="flex gap-7">
              <AdminAsideMenu />
              <AdminAsideMenuResponsive />
              <Box className="w-[1080px] mt-2">
                <div className="m-5">
                  <AdminSecondaryComponent p={t('Orders')} visible={false} />
                </div>
                <ScrollBarContainer bg="#C74FEB">
                  <motion.div
                    className="container"
                    initial={{ opacity: 0, y: -50, x: '-100%' }}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <table className="bg-white m-5">
                      <thead className='h-[50px] border-b-2'>
                        <tr className='p-8'>
                          <th className='w-[100px] text-center'>ID</th>
                          <th className='w-[100px] text-center'>Customer ID</th>
                          <th className='w-[120px] text-center'>Time</th>
                          <th className='w-[200px] text-center'>Delivery Address</th>
                          <th className='w-[150px] text-center'>Amount</th>
                          <th className='w-[150px] text-center'>Payment Method</th>
                          <th className='w-[150px] text-center'>Contact</th>
                          <th className='w-[150px] text-center'>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orderData?.map((order) => (
                          <motion.tr
                            key={order.id}
                            initial={{ opacity: 0, y: -10, x: 0 }}
                            animate={{ opacity: 1, y: 0, x: 0 }}
                            transition={{ duration: 0.5 }}
                            className="border-b text-center dark:border-neutral-500"
                          >
                            <motion.td className="font-medium py-4">
                              <span className="border-2 rounded-lg p-1">
                                {shortText(5, order.id)}
                              </span>
                            </motion.td>
                            <motion.td className="font-medium py-4">
                              <span className="border-2 rounded-lg p-1">
                                {shortText(5, order.customer_id)}
                              </span>
                            </motion.td>
                            <motion.td className="font-normal py-4">
                              {new Date(order.created).toLocaleDateString("en-US", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })}
                            </motion.td>
                            <motion.td className="whitespace-pre-line h-auto w-[10%] font-normal py-4">
                              {shortText(20, order.delivery_address)}
                            </motion.td>
                            <motion.td className="font-normal leading-5 py-4 tracking-wide">
                              {order.amount} $
                            </motion.td>
                            <motion.td className="font-normal leading-5 py-4 tracking-wide">
                              {order.payment_method === 0 ? "cash" : "by credit card"}
                            </motion.td>
                            <motion.td className="font-normal leading-5 py-4 tracking-wide">
                              {order.contact}
                            </motion.td>
                            <motion.td className="font-normal py-4 cursor-pointer">
                              <ButtonGroup>
                                <IconButton
                                  colorScheme="teal"
                                  aria-label="View"
                                  icon={<ViewIcon />}
                                  onClick={() => openModal(order)}
                                />
                                <IconButton
                                  colorScheme="red"
                                  aria-label="Delete"
                                  icon={<DeleteIcon />}
                                  onClick={() => handleDelete(order.id)}
                                />
                              </ButtonGroup>
                            </motion.td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </motion.div>
                </ScrollBarContainer>
              </Box>
            </Box>
          </Box>
        </Box>
      </div>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Order Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedOrder && (
              <div className="w-full h-full overflow-x-auto bg-[#FFFFFF]">
                <table className="text-left w-full text-black text-sm font-light">
                  <thead className="border-b font-semibold">
                    <tr className="text-center">
                      <th scope="col" className="py-4">Image</th>
                      <th scope="col" className="py-4">Name</th>
                      <th scope="col" className="py-4">Price</th>
                      <th scope="col" className="py-4">Count</th>
                      <th scope="col" className="py-4">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.products.map((product) => (
                      <tr className="border-b text-center" key={product.id}>
                        <td className="py-4 font-medium flex justify-center">
                          <Image
                            src={product.img_url}
                            alt="Product Image"
                            width={60}
                            height={60}
                          />
                        </td>
                        <td className="py-4 font-normal">{product.name}</td>
                        <td className="py-4 font-normal">{product.price}</td>
                        <td className="py-4 font-normal">{product.count}</td>
                        <td className="py-4 font-normal">{product.price * product.count}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Orders;

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: { ...(await serverSideTranslations(locale, ['admin'])) },
  };
}
