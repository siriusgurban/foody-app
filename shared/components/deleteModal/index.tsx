// @ts-nocheck

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from '@chakra-ui/react'
import React, { useState } from 'react'

function DeleteModal({ isOpen, onClose }: any) {
  //   const { isOpen, onOpen, onClose } = useDisclosure();
  const handleDeleteClick = (productId: number) => {
    setDeleteProductId(productId)
    // onOpen();
  }
  const [deleteProductId, setDeleteProductId] = useState<number | null>(null)

  const handleDeleteConfirm = () => {
    // Implement delete logic here using deleteProductId
    console.log('Deleting product with ID:', deleteProductId)
    onClose()
  }

  return (
    <AlertDialog
      isOpen={isOpen}
      //   leastDestructiveRef={leastDestructiveRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Product
          </AlertDialogHeader>
          <AlertDialogBody>
            Are you sure? You can not undo this action afterwards.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button onClick={onClose}>Cancel</Button>
            <Button colorScheme="red" onClick={handleDeleteConfirm} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}

export default DeleteModal
