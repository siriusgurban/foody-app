import { instanceAxios } from "../helpers/instanceAxios";
import axios from "axios";
export interface userProfileType {
    name: string | undefined;
    username: string | undefined;
    img_url: string | undefined;
    phone: string;
    fullname: string | undefined;
    email: string | undefined;
    address: string | undefined;
  }
  export async function getProfileInfo() {
    // try {
    let item: any = localStorage.getItem("userInfo");
    let access_token = JSON.parse(item);
    // const userinf: any = localStorage.getItem("userInfo")
    // const access_token: any = JSON.parse(userinf).access_token
    // console.log(access_token);
  
    const response = await instanceAxios.get(`/auth/user/`, {
      headers: {
        Authorization: `Bearer ${access_token.access_token}`,
      },
    });
    console.log(response);
  
    return response;
    // } catch (err) {
    // console.log(err);
    // useReLogin(err)
  
    // }
  }
  
  export async function putProfileInfo(data: userProfileType) {
    try {
       let item: any = localStorage.getItem("userInfo");
  
       let access_token = JSON.parse(item);
  
       const response = await instanceAxios.put(`/auth/user`,data, {
        headers: {
          Authorization: `Bearer ${access_token.access_token}`,
        },
      });
  
      return response;
    } catch (err) {
      console.log(err);
    }
  }
  