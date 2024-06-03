import { instanceAxios } from "../helpers/instanceAxios"

export const AddOrder = async (data: any) => {
    try {
      const response = await instanceAxios({
        method: 'POST',
        url: 'order',
        data,
      })
      return response
    } catch (err) {
      console.log(err)
    }
  }