import { instanceAxios } from '@/shared/helpers/instanceAxios'

// const token = 'my_token'
// const config = {
//   headers: { Authorization: `Bearer ${token}` },
// }

// const newPost = { email: 'admin@gmail.com', password: '123456' }

export const postAdmin = async (data: any) => {
  console.log(data, 'dataOfPostAuth')

  try {
    const response = await instanceAxios({
      method: 'POST',
      url: 'auth/signin',
      data,
      headers: { Accept: 'application/json' },
    })
    return response
  } catch (err) {
    console.log(err, 'postAuth')
  }
}
