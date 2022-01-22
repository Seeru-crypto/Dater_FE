import { configureStore } from '@reduxjs/toolkit'
import  eventReducer  from './slicers/eventSlice'
import { useDispatch, useSelector } from 'react-redux';

export  const store =  configureStore({
    reducer: {
        event: eventReducer
    },
})

export const useAppDispatch = ()=> useDispatch();
export const useAppSelector = useSelector;

