import { configureStore } from '@reduxjs/toolkit';
import filtersReducer from './filters/filters-slice';
import categoriesReducer from './categories/categories-slice';

export const store = configureStore({
    reducer: {
        filters: filtersReducer,
        categories: categoriesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;