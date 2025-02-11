import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/data/categoriesData';
import { Category, Subcategory } from "@/data/categoriesData";

const selectSearchQuery = (state: RootState) => state.filters.searchQuery;
const selectCategoriesData = (state: RootState) => state.categories.data;

export const selectFilteredCategories = createSelector(
    [selectSearchQuery, selectCategoriesData],
    (searchQuery, categoriesData): [string, Category][] => {
        if (!categoriesData || Object.keys(categoriesData).length === 0) return [];

        if (!searchQuery || searchQuery.trim() === "") {
            return Object.entries(categoriesData);
        }

        const query = searchQuery.toLowerCase();
        const matchedKeys = new Set<string>();

        for (const [key, category] of Object.entries(categoriesData)) {
            if (
                category.name?.toLowerCase()?.includes(query) ||
                category.description?.toLowerCase()?.includes(query)
            ) {
                matchedKeys.add(key);
            }

            if (category.subcategories) {
                for (const subcategory of category.subcategories) {
                    if (subcategory.name?.toLowerCase()?.includes(query)) {
                        matchedKeys.add(key);
                        break;
                    }
                }
            }
        }

        return Object.entries(categoriesData).filter(([key]) => matchedKeys.has(key));
    }
);

// const selectSelectedCategory = (state: RootState) => state.filters.selectedCategory;
// const selectSelectedSubcategory = (state: RootState) => state.filters.selectedSubcategory;

// export const selectFilteredSubcategories = createSelector(
//     [selectSearchQuery, selectSelectedCategory],
//     (searchQuery, selectedCategory): Subcategory[] => {
//         if (!selectedCategory) return [];
//         const subcategories = selectedCategory.subcategories || [];
//         if (!searchQuery) return subcategories;
//
//         const query = searchQuery.toLowerCase();
//         return subcategories.filter((sub) =>
//             sub.name.toLowerCase().includes(query) ||
//             (Array.isArray(sub.description)
//                 ? sub.description.some((desc) => desc?.name?.toLowerCase()?.includes(query))
//                 : sub.description?.name?.toLowerCase()?.includes(query))
//         );
//     }
// );
//
// export const selectFilteredItems = createSelector(
//     [selectSearchQuery, selectSelectedSubcategory],
//     (searchQuery, selectedSubcategory) => {
//         if (!selectedSubcategory || !Array.isArray(selectedSubcategory.description)) return [];
//         if (!searchQuery) return selectedSubcategory.description;
//
//         const query = searchQuery.toLowerCase();
//         return selectedSubcategory.description.filter((desc) =>
//             desc.name.toLowerCase().includes(query)
//         );
//     }
// );