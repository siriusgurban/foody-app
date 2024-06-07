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
export const DeleteOrder = async (id: string) => {
  try {
    const response = await instanceAxios({
      method: 'DELETE',
      url: 'order',
      data: { order_id: id },
      headers: config.headers,
    })
    return response
  } catch (err) {
    console.error("Error occurred while adding order:", err)
  }
};
export const GetOrders = async () => {
  const userJSONData = localStorage.getItem("userInfo");
  if (userJSONData) {
    userInfo = JSON.parse(userJSONData);
    const token = userInfo?.access_token;
    try {
      const response = await instanceAxios.get("order", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

};
