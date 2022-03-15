import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import eventReducer from './slicers/eventSlice';
import adminReducer from './slicers/adminSlice';

export const store = configureStore({
  reducer: {
    event: eventReducer,
    admin: adminReducer,
  },
});

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
