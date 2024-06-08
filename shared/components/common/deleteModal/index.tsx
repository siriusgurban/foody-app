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
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {t('DeleteProduct')}
          </AlertDialogHeader>
          <AlertDialogBody>{t('AreYouSure')}</AlertDialogBody>
          <AlertDialogFooter>
            <Button onClick={onClose}>{t('Cancel')}</Button>
            <Button colorScheme="red" onClick={handleDeleteConfirm} ml={3}>
              {t('Delete')}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}

export default DeleteModal
