import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../root-reducer';

const selectSearchQuery = (state: RootState) => state.filters.searchQuery;
const selectCategoriesData = (state: RootState) => state.categories.data; // Предполагается, что категории хранятся в другом слайсе
const selectSelectedCategory = (state: RootState) => state.filters.selectedCategory;
const selectSelectedSubcategory = (state: RootState) => state.filters.selectedSubcategory;

export const selectFilteredCategories = createSelector(
    [selectSearchQuery, selectCategoriesData],
    (searchQuery, categoriesData) => {
        if (!searchQuery) return Object.entries(categoriesData);
        const query = searchQuery.toLowerCase();
        const matchedKeys = new Set<string>();
        for (const [name, key] of Object.entries(categoriesData)) {
            if (name.includes(query)) {
                matchedKeys.add(key);
            }
        }
        return Object.entries(categoriesData).filter(([key]) => matchedKeys.has(key));
    }
);

export const selectFilteredSubcategories = createSelector(
    [selectSearchQuery, selectSelectedCategory],
    (searchQuery, selectedCategory) => {
        if (!selectedCategory) return [];
        const subcategories = selectedCategory.subcategories || [];
        if (!searchQuery) return subcategories;
        const query = searchQuery.toLowerCase();
        return subcategories.filter((sub) =>
            sub.name.toLowerCase().includes(query) ||
            (Array.isArray(sub.description)
                ? sub.description.some((desc) => desc?.name?.toLowerCase().includes(query))
                : sub.description?.name?.toLowerCase()?.includes(query))
        );
    }
);

export const selectFilteredItems = createSelector(
    [selectSearchQuery, selectSelectedSubcategory],
    (searchQuery, selectedSubcategory) => {
        if (!selectedSubcategory || !Array.isArray(selectedSubcategory.description)) return [];
        if (!searchQuery) return selectedSubcategory.description;
        const query = searchQuery.toLowerCase();
        return selectedSubcategory.description.filter((desc) =>
            desc.name.toLowerCase().includes(query)
        );
    }
);