import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/shared/store/store'

// Define a type for the slice state
interface ProductsState {
  value: boolean
}

// Define the initial state using that type
const initialState: ProductsState = {
  value: true,
}

export const productsSlice = createSlice({
  name: 'basket',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    isAllProducts: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload
    },
  },
})

export const { isAllProducts } = productsSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.basket.value

export default productsSlice.reducer
