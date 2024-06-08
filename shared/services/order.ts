import axios from "axios";
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


export const GetOrderUser = async () => {
  try {
    const userJSONData = localStorage.getItem("userInfo");
    if (!userJSONData) {
      throw new Error("User not authenticated");
    }

    const userInfo = JSON.parse(userJSONData);
    const token = userInfo?.access_token;

    if (!token) {
      throw new Error("Token not available");
    }

    const response = await instanceAxios({
      method: 'GET',
      url: 'order/user',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (err) {
    console.error("Error occurred while fetching order history:", err);
    throw err;
  }
};

export const GetOrderHistory = async () => {
  try {
    const userJSONData = localStorage.getItem("userInfo");
    if (!userJSONData) {
      throw new Error("User not authenticated");
    }

    const userInfo = JSON.parse(userJSONData);
    const token = userInfo?.access_token;

    if (!token) {
      throw new Error("Token not available");
    }

    const response = await instanceAxios({
      method: 'GET',
      url: 'order/history',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (err) {
    console.error("Error occurred while fetching order history:", err);
    throw err;
  }
};

