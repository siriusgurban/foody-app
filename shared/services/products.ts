import { instanceAxios } from '@/shared/helpers/instanceAxios'

export const getProducts = async () => {
  try {
    const response = await instanceAxios({ method: 'GET', url: 'products' })
    return response
  } catch (err) {
    console.log(err)
  }
}

export const postProduct = async (data: any) => {
  try {
    const response = await instanceAxios({
      method: 'POST',
      url: 'products',
      data: data,
    })
    return response
  } catch (err) {
    console.log(err)
  }
}

export const deleteProduct = async (productId: number) => {
  try {
    const response = await instanceAxios({
      method: 'DELETE',
      url: `products/${productId}`,
    })
    return response
  } catch (err) {
    console.log(err)
  }
}
