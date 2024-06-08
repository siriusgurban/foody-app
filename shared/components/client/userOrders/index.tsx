import { DeleteOrder, GetOrderUser } from '@/shared/services/order'
import { DeleteIcon, ViewIcon } from '@chakra-ui/icons'
import {
  Button,
  ButtonGroup,
  IconButton,
  Toast,
  useDisclosure,
} from '@chakra-ui/react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'

import React, { useState } from 'react'
import { ScrollBarContainer } from '../../common/Scroll/scroll'
import { shortText } from '@/shared/helpers/shortText'
import Image from 'next/image'
interface Order {
  id: string
  customer_id: string
  created: string
  delivery_address: string
  amount: number
  payment_method: number
  contact: string
  products: Array<{
    id: string
    img_url: string
    name: string
    price: number
    count: number
  }>
}

interface GetOrderUser {
  result: {
    data: Order[]
  }
}
function UserOrders() {
  const queryClient = useQueryClient()
  const [selectedOrderuser, setSelectedOrderuser] = useState<Order | null>(null)

  const { isOpen, onOpen, onClose } = useDisclosure()

  const { data } = useQuery<GetOrderUser>({
    queryFn: GetOrderUser,
    queryKey: ['orders'],
  })
  const orderData = data?.result?.data

  console.log('orderUser', data)
  const openModal = (order: Order) => {
    setSelectedOrderuser(order)
    onOpen()
  }

  const { mutate } = useMutation({
    mutationFn: DeleteOrder,
    onSuccess: () => {
      Toast({
        title: ' User Order deleted',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      queryClient.invalidateQueries({ queryKey: ['order-user'] })
    },
    onError: (error) => {
      console.error(error)
      Toast({
        title: 'Error deleting order',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    },
  })
  const handleDelete = (id: string) => {
    mutate(id)
  }

  return (
    <>
      <div>
        <ScrollBarContainer bg="#C74FEB">
          <motion.div
            className="container"
            initial={{ opacity: 0, y: -50, x: '-100%' }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <table className="bg-white m-5">
              <thead className="h-[50px] border-b-2">
                <tr className="p-8">
                  <th className="w-[100px] text-center">ID</th>
                  <th className="w-[100px] text-center">Customer ID</th>
                  <th className="w-[120px] text-center">Time</th>
                  <th className="w-[200px] text-center">Delivery Address</th>
                  <th className="w-[150px] text-center">Amount</th>
                  <th className="w-[150px] text-center">Payment Method</th>
                  <th className="w-[150px] text-center">Contact</th>
                  <th className="w-[150px] text-center">Actions</th>
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
                      {new Date(order.created).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </motion.td>
                    <motion.td className="whitespace-pre-line h-auto w-[10%] font-normal py-4">
                      {shortText(20, order.delivery_address)}
                    </motion.td>
                    <motion.td className="font-normal leading-5 py-4 tracking-wide">
                      {order.amount} $
                    </motion.td>
                    <motion.td className="font-normal leading-5 py-4 tracking-wide">
                      {order.payment_method === 0 ? 'cash' : 'by credit card'}
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
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Order Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedOrderuser && (
              <div className="w-full h-full overflow-x-auto bg-[#FFFFFF]">
                <table className="text-left w-full text-black text-sm font-light">
                  <thead className="border-b font-semibold">
                    <tr className="text-center">
                      <th scope="col" className="py-4">
                        Image
                      </th>
                      <th scope="col" className="py-4">
                        Name
                      </th>
                      <th scope="col" className="py-4">
                        Price
                      </th>
                      <th scope="col" className="py-4">
                        Count
                      </th>
                      <th scope="col" className="py-4">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrderuser.products.map((product) => (
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
                        <td className="py-4 font-normal">
                          {product.price * product.count}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default UserOrders
