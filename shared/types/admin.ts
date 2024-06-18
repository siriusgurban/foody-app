import { UseMutationOptions } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

export type token = {
  access_token: string
  refresh_token: string
}

export type adminLogin = {
  email: string
  password: string
}

export type Form = {
  name: string | undefined | string[]
  slug?: string | undefined | string[]
  img_url: string | undefined | string[]
}

export interface Restaurant {
  id?: any
  address: string | null | undefined
  category_id: any
  img_url?: any
  created?: number // Assuming it represents a Unix timestamp
  name?: any
  cuisine: string | null
  delivery_min: number | null
  delivery_price: number | null
  products?: Product[]
}

export interface Product {
  id: string
  img_url: string
  price: number
  created: number // Assuming it represents a Unix timestamp
  name: string
  description: string
  rest_id: string
  count?: number
}

export interface Offer {
  id?: string
  name: string
  img_url: string
  description: string
  created?: number // Assuming it represents a Unix timestamp
}

export interface CustomMutationOptions
  extends UseMutationOptions<
    AxiosResponse<any, any> | undefined,
    Error,
    void,
    unknown
  > {
  queryKey?: string[] // Define the queryKey property
}
