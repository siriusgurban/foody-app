import { instanceAxios } from '@/shared/helpers/instanceAxios'
import { Form } from '../types/admin'

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
      url: 'category' + '/' + id,
    })
    return response
  } catch (err) {
    console.log(err)
  }
}

export const deleteCategory = async (id: string) => {
  try {
    const response = await instanceAxios({
      method: 'DELETE',
      url: 'category' + '/' + id,
    })
    return response
  } catch (err) {
    console.log(err)
  }
}

export const updateCategory = async (id: string, data: Form) => {
  try {
    const response = await instanceAxios({
      method: 'PUT',
      url: 'category/' + id,
      data,
    })
    return response
  } catch (err) {
    console.log(err)
  }
}

export const postCategory = async (data: Form) => {
  try {
    const response = await instanceAxios({
      method: 'POST',
      url: 'category',
      data,
    })
    return response
  } catch (err) {
    console.log(err)
  }
}
