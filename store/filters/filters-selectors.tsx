import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/data/categoriesData';
import { Category, Subcategory } from "@/data/categoriesData";

const selectSearchQuery = (state: RootState) => state.filters.searchQuery;
const selectCategoriesData = (state: RootState) => state.categories.data;
const selectSelectedCategoryKey = (state: RootState) => state.filters.selectedCategory;
const selectSelectedSubcategory = (state: RootState) => state.filters.selectedSubcategory;

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

export const selectSelectedCategory = createSelector(
    [selectCategoriesData, selectSelectedCategoryKey],
    (categoriesData, selectedCategoryKey): Category | undefined => {
        if (!categoriesData || !selectedCategoryKey) return undefined;
        return categoriesData[selectedCategoryKey];
    }
);

export const selectFilteredSubcategories = createSelector(
    [selectSearchQuery, selectCategoriesData, selectSelectedCategoryKey],
    (searchQuery, categoriesData, selectedCategoryKey): Subcategory[] => {
        const selectedCategory = categoriesData[selectedCategoryKey];
        const query = searchQuery.toLowerCase();

        if (!categoriesData || !selectedCategoryKey) return [];

        if (!selectedCategory || !selectedCategory.subcategories) return [];

        if (!searchQuery || searchQuery.trim() === "") {
            return selectedCategory.subcategories;
        }


        return selectedCategory.subcategories.filter((sub) => {
            if (sub.name?.toLowerCase().includes(query)) return true;

            if (Array.isArray(sub.description)) {
                return sub.description.some((desc) =>
                    desc?.name?.toLowerCase()?.includes(query)
                );
            }

            if (typeof sub.description === 'string') {
                return sub.description.toLowerCase().includes(query);
            }

            return false;
        });
    }
);
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