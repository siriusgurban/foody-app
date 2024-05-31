import React from 'react'
import AdminModalDropdown from '../adminModalDropdown'
import AdminModalButton from '../adminModalButton'
import { AddIcon } from '@chakra-ui/icons'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
interface Props {
  p?: string
  onClick?: () => void
  visible: boolean
  getText?: (text: string) => void
}

const AdminSecondaryComponent = ({ onClick, visible, p, getText }: Props) => {
  const { pathname } = useRouter()
  const isTrue = pathname == "/admin/order-history" || pathname == "/admin/orders"
  const { t } = useTranslation('admin')
  return (
    <>
      <div className="  bg-admin-secondary rounded-2xl flex flex-col sm:flex-row justify-between items-center p-5 ">
        <div className="   text-admin-secondary-heading text-xl  font-medium  ">
          {t(`${p}`)}
        </div>
        <div className="mt-3 sm:mt-0 flex flex-col items-center   sm:flex-row gap-5 ">
          {visible ? (
            <AdminModalDropdown
              p={''}
              className=" flex  width-200  gap-3 "
              classNameSelect=" rounded-2xl  py-2   px-2   bg-admin-input  rounded-2xl font-medium text-base  text-admin-secondary-heading    w-[170px] overflow-x-auto"
              getText={getText}
            />
          ) : (
            ''
          )}
          {!isTrue && <>
            <AdminModalButton
              onClick={onClick}
              className="text-admin-secondary-add bg-admin-add-button-bg text-sm px-4 py-2  rounded-sm  font-bold  sm:rounded-2xl"
            >
              <span>
                <AddIcon className=" w-2" color="white" />
              </span>{' '}
              { }   {t(`ADD ${p?.toLocaleUpperCase()}`)}
            </AdminModalButton>
          </>}

        </div>
      </div>
    </>
  )
}

export default AdminSecondaryComponent
