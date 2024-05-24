import { instanceAxios } from '@/shared/helpers/instanceAxios'

export const getOffers = async () => {
  try {
    const response = await instanceAxios({ method: 'GET', url: 'offer' })
    return response
  } catch (err) {
    console.log(err)
  }
}