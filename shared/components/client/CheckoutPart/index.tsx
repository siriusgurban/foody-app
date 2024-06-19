import { getUser } from '@/shared/services/admin'
import { getBasket } from '@/shared/services/basket'
import { AddOrder } from '@/shared/services/order'
import { Toast } from '@chakra-ui/react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setCheckOrderTrue } from '../../../store/checkOrderSlice'
function CheckoutPart() {
  const [address, setAddress] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [userDatas, setUserDatas] = useState<{
    contact: string
    delivery_address: string
    payment_method: number | null
  }>({
    contact: '',
    delivery_address: '',
    payment_method: null,
  })
  const { data: userData } = useQuery({
    queryFn: getUser,
    queryKey: ['user'],
  })

  const { data: basketData } = useQuery({
    queryFn: getBasket,
    queryKey: ['basket'],
  })
  const queryClient = useQueryClient()
  const dispatch = useDispatch()
  // console.log("dispatch",dispatch)
  // console.log("UserData", userData);
  const isButtonDisabled = !basketData?.data?.result?.data?.items?.length
  console.log("BasketData", isButtonDisabled)
  const basketId = basketData?.data?.result?.data?.id
  //console.log("basketId", basketId);
  const newData = { ...userDatas, basket_id: basketId }
  const { mutate } = useMutation({
    mutationFn: AddOrder,
    onSuccess(data, variables, context) {
      // console.log(data, 'success')
      Toast({
        title: 'Added order',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    },
    onError(data, variables, context) {
      // console.log(data, 'error')
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['orders'],
      })
    },
  })

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    if (
      !userDatas.delivery_address ||
      !userDatas.contact ||
      userDatas.payment_method === null
    ) {
      Toast({
        title: 'Please fill in all the required fields',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      return
    }
    mutate(newData)
    dispatch(setCheckOrderTrue())
  }

  return (
    <form
      className="sm:ml-5 sm:mr-2 sm:px-6 sm:py-6 w-full md:bg-[#F3F4F6] bg-[#FFFFFF]"
      onSubmit={handleSubmit}
    >
      <h1 className="text-[#4F4F4F] text-[30px] h-8 font-semibold leading-6 md:ml-0 ml-8 hidden md:block">
        Checkout
      </h1>

      <div className="flex justify-center flex-wrap items-center">
        <div className="mt-4 flex justify-center items-center  ">
          <div className="grid grid-cols-1  gap-3 h-full">
            <div>
              <label
                htmlFor="inputField"
                className="block text-lg font-semibold leading-6 text-[#4F4F4F]  mb-3"
              >
                Delivery Address
              </label>
              <input
                name="delivery_address"
                type="text"
                id="inputField"
                className="mt-1 p-2 border text-[#828282] leading-6 font-normal rounded text-xl  w-[260px] h-[53px] sm:w-[320px] xl:w-[400px] md:bg-[#FFFFFF] bg-[#F3F4F6] "
                placeholder="Your Address"
                onChange={(event) => {
                  setAddress(event.target.value)
                  setUserDatas({
                    ...userDatas,
                    [event.target.name]: event.target.value,
                  })
                }}
              />
            </div>

            <div>
              <label
                htmlFor="inputField"
                className="block text-lg font-semibold leading-6 text-[#4F4F4F] mb-3"
              >
                Contact Number
              </label>
              <input
                name="contact"
                type="tel"
                id="inputField"
                pattern="\d*"
                className="mt-1 p-2 border text-[#828282] leading-6 font-normal rounded text-xl  sm:w-[320px] xl:w-[400px]  h-[53px] w-[260px]  md:bg-[#FFFFFF] bg-[#F3F4F6] "
                placeholder="Your Number"
                value={phone}
                onChange={(event) => {
                  const value = event.target.value
                  if (/^\d*$/.test(value)) {
                    setPhone(value)
                    setUserDatas({
                      ...userDatas,
                      [event.target.name]: value,
                    })
                  }
                }}
              />
            </div>

            <div>
              <label
                htmlFor="inputField"
                className="block text-lg font-semibold leading-6 text-[#4F4F4F]"
              >
                Payment Method
              </label>

              <div className="flex justify-between  mt-2">
                <div className="grid grid-cols-1 md:grid-cols-2   gap-3">
                  <div className="flex items-center  ">
                    <input
                      type="radio"
                      className="form-radio h-5 w-5  text-green-500"
                      name="payment_method"
                      value={0}
                      onChange={(event) => {
                        setUserDatas({
                          ...userDatas,
                          [event.target.name]: parseInt(event.target.value),
                        })
                      }}
                    />
                    <label className="text-[#6FCF97] text-sm ml-2 font-normal leading-6">
                      pay at the door by credit card
                    </label>
                  </div>

                  <div className="flex items-center ">
                    <input
                      type="radio"
                      className="form-radio h-5 w-5  text-green-500"
                      name="payment_method"
                      value={1}
                      onChange={(event) => {
                        setUserDatas({
                          ...userDatas,
                          [event.target.name]: parseInt(event.target.value),
                        })
                      }}
                    />
                    <label className="text-[#6FCF97] text-sm ml-2 font-normal leading-6">
                      pay at the door by credit card
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <button className="bg-[#6FCF97]  w-[260px]  sm:w-[320px] xl:w-[360px]  h-[53px] mt-7 rounded text-[#FFFFFF] text-[18px] font-semibold leading-6 hover:bg-[#379c5f]" disabled={isButtonDisabled}>
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

export default CheckoutPart
