import { createSlice } from '@reduxjs/toolkit';
import { Category } from "@/data/categoriesData";

interface CategoriesState {
    data: Record<string, Category>;
}

const initialState: CategoriesState = {
    data: {},
};

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setCategoriesData: (state, action) => {
            state.data = action.payload;
        },
    },
});

export const { setCategoriesData } = categoriesSlice.actions;
export default categoriesSlice.reducer;