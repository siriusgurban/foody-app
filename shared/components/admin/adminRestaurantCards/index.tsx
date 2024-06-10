import { deleteRestuarant, getRestuarants } from '@/shared/services/restaurants'
import { useQuery } from '@tanstack/react-query'
import { resolveSoa } from 'dns'
import Image from 'next/image'
import React, { FC, useState } from 'react'
import { MdDeleteForever, MdEdit } from 'react-icons/md'
import { useRouter } from 'next/router'
import { getCategories, getCategoryById } from '@/shared/services/category'
import { QUERY } from '@/shared/constants/query'
import DeleteModal from '../../common/deleteModal'
import { useDisclosure } from '@chakra-ui/react'
import { useCORP } from '@/shared/hooks/useCORP'

interface AdminRestaurantsCardProps {
  onDelete?: (id: any) => void
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
  const { push, pathname } = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [deleteProductId, setDeleteProductId] = useState<string | null>(null)

  const { data, isLoading, isError } = useQuery<any, any>({
    queryFn: () => getCategoryById(category_id),
    queryKey: ['category'],
  })

  const categoryData: any = data?.result?.data?.name

  console.log(categoryData, 'categoryData')

  const truncateText = (text: any, length: any) => {
    if (text?.length > length) {
      return text?.slice(0, length) + '...'
    }
    return text
  }

  const { data: categories } = useQuery({
    queryFn: getCategories,
    queryKey: [QUERY.CATEGORIES],
  })

  // delete
  const { mutate } = useCORP({
    queryFn: deleteRestuarant,
    queryKey: [QUERY.RESTAURANTS],
    toastText: 'Restaurant deleted',
  })

  const handleDeleteClick = (productId: string) => {
    setDeleteProductId(productId)
    onOpen()
  }

  const handleDeleteConfirm = () => {
    mutate(deleteProductId)
    onClose()
  }

  console.log(categories, 'categories')

  function handleRestCat(id: string) {
    let CateName = categories?.data?.result?.data?.find(
      (item: any, index: number) => id == item?.id,
    )

    return CateName?.name
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
              {truncateText(handleRestCat(category_id), 9)}
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <button onClick={() => handleDeleteClick(restaurant_id)}>
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
        <DeleteModal
          isOpen={isOpen}
          onClose={onClose}
          handleDeleteConfirm={handleDeleteConfirm}
        />
      </div>
    </>
  )
}

export default AdminRestaurantsCard
