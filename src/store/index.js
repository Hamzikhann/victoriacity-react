import { combineReducers, configureStore } from '@reduxjs/toolkit'
import auth from './authSlice';
// import order from './orderSlice';
// import header from './headerSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk'

const persistConfig = {
  key: 'root',
  storage,
};
const combineReducer = combineReducers({
  auth

})

const persistedReducer = persistReducer(persistConfig, combineReducer)
export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
})

export const persistor = persistStore(store)