import { combineReducers } from '@reduxjs/toolkit';
import filtersReducer from './filters/filters-slice';

const rootReducer = combineReducers({
    filters: filtersReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
