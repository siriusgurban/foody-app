import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/shared/store/store'

// Define a type for the slice state
interface asideMenuState {
  value: boolean
}

// Define the initial state using that type
const initialState: asideMenuState = {
  value: false,
}

export const asideMenuSlice = createSlice({
  name: 'asidemenu',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    isOpenFn: (state, action) => {
      state.value = !action.payload
    },
  },
})

export const { isOpenFn } = asideMenuSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const isOpen = (state: RootState) => state.asideMenu.value

export default asideMenuSlice.reducer
