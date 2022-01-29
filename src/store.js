import { configureStore } from '@reduxjs/toolkit'
import  eventReducer  from './slicers/eventSlice'
import adminReducer from "./slicers/adminSlice"
import { useDispatch, useSelector } from 'react-redux';

export  const store =  configureStore({
    reducer: {
        event: eventReducer,
        admin: adminReducer
    },
})

export const useAppDispatch = ()=> useDispatch();
export const useAppSelector = useSelector;

