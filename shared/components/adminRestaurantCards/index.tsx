import { getRestuarants } from '@/shared/services/restaurants'
import { useQuery } from '@tanstack/react-query'
import { resolveSoa } from 'dns'
import Image from 'next/image'
import React, { FC, useState } from 'react'
import { MdDeleteForever, MdEdit } from 'react-icons/md'
import DeleteModalRestaurant from '../deleteModalRestaurantCards'
import { useRouter } from 'next/router'
import { getCategoryById } from '@/shared/services/category'

interface AdminRestaurantsCardProps {
  onDelete: (id: any) => void
  key: number
  img_url: string
  name: string
  restaurant_id: any
  category_id: string
  onClickClose: any
}

const AdminRestaurantsCard: FC<AdminRestaurantsCardProps> = ({
  onDelete,
  key,
  img_url,
  name,
  restaurant_id,
  category_id,
  onClickClose,
}) => {
  const [hideModalUpdate, setHideModalUpdate] = useState<boolean>(true)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const { push, pathname } = useRouter()

  const { data, isLoading, isError } = useQuery<any, any>({
    queryFn: () => getCategoryById(category_id),
    queryKey: ['category'],
  })

  const categoryData: any = data?.result?.data.name

  console.log(categoryData, 'categoryData')
  function showHideModalUpdate() {
    setHideModalUpdate((prev) => !prev)
  }

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true)
  }

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false)
  }

  const handleDeleteConfirm = () => {
    onDelete(restaurant_id)
    closeDeleteModal()
  }

  const truncateText = (text: any, length: any) => {
    if (text?.length > length) {
      return text?.slice(0, length) + '...'
    }
    return text
  }

  return (
    <>
      <div
        key={key}
        className="relative bg-admin-secondary-add w-64 h-20 rounded-md border-2 shadow-md p-2 mb-4 font-display"
      >
        <div className="flex w-full h-full items-center justify-between gap-4">
          <div className="w-20 h-16 flex-shrink-0 mr-2 relative mt-6 ">
            {/* <div className="w-full h-full relative"> */}
            <Image
              src={img_url}
              alt={name}
              className=" w-full h-full object-cover pb-3 pt-0   rounded-sm"
              width={100}
              height={100}
            />

            {/* </div> */}
          </div>
          <div className="flex flex-col flex-grow">
            <p className="text-gray-900 text-lg font-medium whitespace-nowrap overflow-hidden overflow-ellipsis">
              {truncateText(name, 9)}
            </p>
            <p className="text-sm font-medium text-admin-restaurant-card-category whitespace-nowrap overflow-hidden overflow-ellipsis">
              {truncateText(categoryData, 9)}
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <button onClick={openDeleteModal}>
              <span>
                <MdDeleteForever className="fill-admin-delete-icon w-5 h-5    hover:fill-pink-900  hover:scale-95 transition-all duration-500 " />
              </span>
            </button>
            <button
              onClick={() => {
                push(pathname + '?id=' + restaurant_id), onClickClose()
              }}
            >
              <span>
                <MdEdit className="fill-admin-edit-icon w-5 h-5  hover:fill-green-800  hover:scale-95 transition-all duration-500" />
              </span>
            </button>
          </div>
        </div>
        <DeleteModalRestaurant
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
          onDeleteConfirm={handleDeleteConfirm}
        />
      </div>
    </>
  )
}

export default AdminRestaurantsCard
