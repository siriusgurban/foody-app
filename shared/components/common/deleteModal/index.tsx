// @ts-nocheck

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
} from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'

function DeleteModal({ isOpen, onClose, handleDeleteConfirm }: any) {
  const { t } = useTranslation('admin')
  const cancelRef = React.useRef<FocusableElemen>()
  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent className="pt-6 pb-10 ">
          {/* <AlertDialogHeader></AlertDialogHeader> */}
          <AlertDialogBody className="flex flex-col gap-2.5 rounded-none text-center text-lg mx-auto ">
            <Box className="md:text-3xl xs:text-xl font-semibold max-w-[380px]">
              {t('DeleteProduct')}
            </Box>
            <Box className="max-w-[280px] text-client-main-gray2 mx-auto md:text-lg xs:text-sm">
              {t('AreYouSure')}
            </Box>
            <Box className="flex xl:flex-row lg:flex-row md:flex-row sm:flex-col-reverse xs:flex-col-reverse mx-auto justify-center md:gap-7 sm:gap-2.5 xs:gap-2.5">
              <Button
                onClick={onClose}
                rounded="none"
                size="sm"
                className="border border-client-main-gray1 md:w-24 xs:w-64 py-2 lowercase"
              >
                {t('Cancel')}
              </Button>
              <Button
                colorScheme="red"
                size="sm"
                rounded="none"
                onClick={handleDeleteConfirm}
                className="md:w-24 xs:w-64 lowercase"
              >
                {t('Delete')}
              </Button>
            </Box>
          </AlertDialogBody>
          {/* <AlertDialogFooter></AlertDialogFooter> */}
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}

export default DeleteModal
