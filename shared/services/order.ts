import { instanceAxios } from "../helpers/instanceAxios"

let userInfo: any = {};

if (typeof localStorage !== 'undefined') {
  const storedUserInfo = localStorage.getItem('userInfo');
  if (storedUserInfo) {
    userInfo = JSON.parse(storedUserInfo);
  }
}

const config = {
  headers: { Authorization: `Bearer ${userInfo.access_token}` },
}

export const AddOrder = async (data: any) => {
  try {
    const response = await instanceAxios({
      method: 'POST',
      url: 'order',
      data,
      headers: config.headers,
    })
    return response
  } catch (err) {
    console.error("Error occurred while adding order:", err)
  }
}
