// @ts-nocheck

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'

function DeleteModal({ isOpen, onClose, handleDeleteConfirm }: any) {
  const { t } = useTranslation('admin')
  return (
    <AlertDialog
      isOpen={isOpen}
      // leastDestructiveRef={leastDestructiveRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader
            fontSize="x-large"
            fontWeight="bold"
            className="bg-client-main-red text-center"
          >
            {t('DeleteProduct')}
          </AlertDialogHeader>
          <AlertDialogBody className="bg-white rounded-none text-center text-lg max-w-[300px] mx-auto text-client-main-gray2">
            {t('AreYouSure')}
          </AlertDialogBody>
          <AlertDialogFooter display="flex" justifyContent="center" gap={5}>
            <Button onClick={onClose} size="sm" rounded="none">
              {t('Cancel')}
            </Button>
            <Button
              colorScheme="red"
              size="sm"
              rounded="none"
              onClick={handleDeleteConfirm}
              ml={3}
            >
              {t('Delete')}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}

export default DeleteModal
