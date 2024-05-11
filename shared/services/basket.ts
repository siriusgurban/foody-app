import { instanceAxios } from '@/shared/helpers/instanceAxios'

export const getBasket = async () => {
  try {
    const response = await instanceAxios({
      method: 'GET',
      url: 'basket',
    })
    return response
  } catch (err) {
    console.log(err)
  }
}

export const postBasket = async (data: any) => {
  try {
    const response = await instanceAxios({
      method: 'POST',
      url: 'basket/add',
      data,
    })
    return response
  } catch (err) {
    console.log(err)
  }
}
