import { useDispatch, useSelector, useStore } from 'react-redux'

import { baseApi } from '@/src/shared/api/baseApi'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import { createWrapper } from 'next-redux-wrapper'

const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
})

export const makeStore = () => {
  return configureStore({
    devTools: process.env.NODE_ENV !== 'production',
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware),
    reducer: rootReducer,
  })
}

setupListeners(makeStore().dispatch)

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppStore = useStore.withTypes<AppStore>()

export const wrapper = createWrapper<AppStore>(makeStore, {
  debug: process.env.NODE_ENV === 'development',
})
