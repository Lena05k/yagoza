import { createSlice } from '@reduxjs/toolkit';

interface FiltersState {
    searchQuery: string;
    selectedCategory: string | null;
    selectedSubcategory: string | null;
}

const initialState: FiltersState = {
    searchQuery: '',
    selectedCategory: null,
    selectedSubcategory: null,
};

export const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
        setSelectedCategory: (state, action) => {
            state.selectedCategory = action.payload;
        },
        setSelectedSubcategory: (state, action) => {
            state.selectedSubcategory = action.payload;
        },
    },
});

export const { setSearchQuery, setSelectedCategory, setSelectedSubcategory } = filtersSlice.actions;

export default filtersSlice.reducer;