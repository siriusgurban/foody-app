import { instanceAxios } from '@/shared/helpers/instanceAxios'

export const getRestuarants = async () => {
  try {
    const response = await instanceAxios({ method: 'GET', url: 'restuarants' })
    return response
  } catch (err) {
    console.log(err)
  }
}

export const getRestuarantById = async (id: string) => {
  try {
    const response = await instanceAxios({
      method: 'GET',
      url: 'restuarants' + '/' + id,
    })
    return response
  } catch (err) {
    console.log(err)
  }
}

export const deleteRestuarant = async (id: string) => {
  try {
    const response = await instanceAxios({
      method: 'DELETE',
      url: 'restuarants' + '/' + id,
    })
    return response
  } catch (err) {
    console.log(err)
  }
}

export const updateRestuarant = async (id: string, data: any) => {
  try {
    const response = await instanceAxios({
      method: 'PUT',
      url: 'restuarants' + '/' + id,
      data,
    })
    return response
  } catch (err) {
    console.log(err)
  }
}

export const postRestuarant = async (data: any) => {
  try {
    const response = await instanceAxios({
      method: 'POST',
      url: 'restuarants',
      data,
    })
    return response
  } catch (err) {
    console.log(err)
  }
}
