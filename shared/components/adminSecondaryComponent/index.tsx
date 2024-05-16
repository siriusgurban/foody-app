import React from 'react'
import AdminModalDropdown from '../adminModalDropdown';
import AdminModalButton from '../adminModalButton';
import { AddIcon } from '@chakra-ui/icons'
import { useTranslation } from 'react-i18next';
interface Props {
    p?: string;
    onClick?: () => void;
    visible: boolean;
}

const AdminSecondaryComponent = ({ onClick, visible, p }: Props) => {
    const { t } = useTranslation('admin')
    return (
        <>
            <div className=" bg-admin-main rounded-2xl flex flex-col sm:flex-row justify-between items-center p-8 ">
                <div className="   text-admin-text text-xl  font-medium  ">
                    Restaurants
                </div>
                <div className="mt-3 sm:mt-0 flex flex-col items-center   sm:flex-row gap-5 ">
                    {visible ? (
                        <AdminModalDropdown
                            p={""}
                            className=" flex  width-200  gap-3 "
                            classNameSelect=" rounded-2xl  py-2   px-2   bg-admin-input  rounded-2xl font-medium text-base  text-admin-text w-[170px] overflow-x-auto"
                        />
                    ) : (
                        ""
                    )}

                    <AdminModalButton onClick={onClick} className='text-admin-secondary-add bg-admin-add-button-bg text-sm px-4 py-2  rounded-sm  font-bold  sm:rounded-2xl' ><span><AddIcon className=' w-2' color="white" /></span> {t('ADD RESTAURANT')} </AdminModalButton>

                </div>
            </div>
        </>
    )
}

export default AdminSecondaryComponent