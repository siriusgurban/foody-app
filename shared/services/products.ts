import { instanceAxios } from '@/shared/helpers/instanceAxios'
import { Product } from '../types/admin'

export const getProducts = async () => {
  try {
    const response = await instanceAxios({ method: 'GET', url: 'products' })
    return response
  } catch (err) {
    console.log(err)
  }
}

export const getProductById = async (id: string) => {
  try {
    const response = await instanceAxios({
      method: 'GET',
      url: 'products' + '/' + id,
    })
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

export const updateProduct = async ({ id, data }: { id: any; data: any }) => {
  try {
    const response = await instanceAxios({
      method: 'PUT',
      url: `products/${id}`,
      data: data,
    })
    return response
  } catch (err) {
    console.log(err)
  }
}

export const deleteProduct = async (productId: string) => {
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
