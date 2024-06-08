import { instanceAxios } from '@/shared/helpers/instanceAxios'

let userInfo: any = JSON.parse(
  typeof localStorage !== 'undefined'
    ? localStorage.getItem('userInfo') ?? '{}'
    : '{}',
)

const config = {
  headers: { Authorization: `Bearer ${userInfo.access_token}` },
}
// console.log(userInfo, 'userInfo.access_token')

export const getBasket = async () => {
  try {
    const response = await instanceAxios({
      method: 'GET',
      url: 'basket',
      headers: config.headers,
    })
    console.log(response)

    return response
  } catch (err) {
    console.log(err)
  }
}

export const postBasket = async (data: string) => {
  try {
    const response = await instanceAxios({
      method: 'POST',
      url: 'basket/add',
      data,
      headers: config.headers,
    })
    // console.log(tokenObj.access_token, 'tokenObjtokenObjtokenObj')

    return response
  } catch (err) {
    console.log(err)
  }
}

export const deleteBasket = async (data: string) => {
  try {
    const response = await instanceAxios({
      method: 'DELETE',
      url: 'basket/delete',
      data,
      headers: config.headers,
    })
    return response
  } catch (err) {
    console.log(err)
  }
}

export const clearBasket = async (data: string) => {
  try {
    const response = await instanceAxios({
      method: 'DELETE',
      url: 'basket/clear',
      data,
      headers: config.headers,
    })
    return response
  } catch (err) {
    console.log(err)
  }
}
