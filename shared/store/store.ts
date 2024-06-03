import { configureStore } from '@reduxjs/toolkit'
import basketSlice from './basketSlice/basketSlice'
import asideMenuSlice from './responsiveSlice/asideMenuSlice'
import checkOrderSlice from './checkOrderSlice'
// import asideMenuSlice from './asideMenuSlice/asideMenuSlice'
// ...

const store = configureStore({
  reducer: {
    basket: basketSlice,
    asideMenu: asideMenuSlice,
    checkOrder: checkOrderSlice
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store
