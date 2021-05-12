import { configureStore } from '@reduxjs/toolkit';
import filterReducer from '../features/filterSlice';
import modalReducer from '../features/modalSlice';
import dataReducer from '../features/dataSlice';

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    modal: modalReducer,
    data: dataReducer,
  },
});
