export type token = {
  access_token: string
  refresh_token: string
}

export type adminLogin = {
  email: string
  password: string
}

export interface Restaurant {
  id: string
  address: string
  category_id: string
  img_url: string
  created: number // Assuming it represents a Unix timestamp
  name: string
  cuisine: string
  delivery_min: number
  delivery_price: number
  products: Product[]
}

export interface Product {
  id: string
  img_url: string
  price: number
  created: number // Assuming it represents a Unix timestamp
  name: string
  description: string
  rest_id: string
}
