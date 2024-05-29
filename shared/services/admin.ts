import { instanceAxios } from '@/shared/helpers/instanceAxios'

let userInfo: any = JSON.parse(
  typeof localStorage !== 'undefined'
    ? localStorage.getItem('userInfo') ?? '{}'
    : '{}',
)

const config = {
  headers: { Authorization: `Bearer ${userInfo.access_token}` },
}

export const getUser = async () => {
  try {
    const response = await instanceAxios({
      method: 'GET',
      url: 'auth/user',
      headers: config.headers,
    })
    return response
  } catch (err) {
    console.log(err, 'userAuth')
  }
}

export const postAdmin = async (data: any) => {
  try {
    const response = await instanceAxios({
      method: 'POST',
      url: 'auth/signin',
      data,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    localStorage.setItem('userInfo', JSON.stringify(response?.data?.user))

    return response
  } catch (err) {
    console.log(err, 'postAuth')
  }
}
