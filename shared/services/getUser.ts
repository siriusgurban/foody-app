import { instanceAxios } from "../helpers/instanceAxios";

interface UserInfo {
  user: {
    access_token: string;
  };
}

export const GetUser = async (): Promise<any> => {  
  try {
    const userJSONData = localStorage.getItem("userInfo");
    
    if (!userJSONData) {
      throw new Error("User information not found in local storage");
    }

    const userData: UserInfo = JSON.parse(userJSONData);
    const token = userData?.user?.access_token;

    if (!token) {
      throw new Error("Access token not found in user data");
    }

    const response = await instanceAxios.get("/api/auth/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};
