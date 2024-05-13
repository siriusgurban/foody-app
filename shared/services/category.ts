import { instanceAxios } from '@/shared/helpers/instanceAxios'

export const getCategories = async () => {
  try {
    const response = await instanceAxios({ method: 'GET', url: 'category' })
    return response
  } catch (err) {
    console.log(err)
  }
}

export const getCategoryById = async (id: string) => {
  try {
    const response = await instanceAxios({
      method: 'GET',
      url: 'category' + '?id=' + id,
    })
    return response
  } catch (err) {
    console.log(err)
  }
}
