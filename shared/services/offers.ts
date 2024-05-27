import { instanceAxios } from '@/shared/helpers/instanceAxios'

export const getOffers = async () => {
  try {
    const response = await instanceAxios({ method: 'GET', url: 'offer' })
    return response
  } catch (err) {
    console.log(err)
  }
}

export const AddOffers = async (data: any) => {
  try {
    const response = await instanceAxios({
      method: 'POST',
      url: 'offer',
      data,
    })
    return response
  } catch (err) {
    console.log(err)
  }
}

export const DeleteOffer = async (id: string) => {
  try {
    const response = await instanceAxios({
      method: 'DELETE',
      url: 'offer' + '/' + id,
    })
    return response
  } catch (err) {
    console.log(err)
  }
}