import { instanceAxios } from '@/shared/helpers/instanceAxios'

export const getProducts = async () => {
  try {
    const response = await instanceAxios({ method: 'GET', url: 'products' })
    return response
  } catch (err) {
    console.log(err)
  }
}
