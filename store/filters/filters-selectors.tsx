import { createSelector } from '@reduxjs/toolkit';
import { Category, Subcategory, Ingredient, RootState } from '@/data/categoriesData';

const selectSearchQuery = (state: RootState) => state.filters.searchQuery;
const selectCategoriesData = (state: RootState) => state.categories.data;
const selectSelectedCategoryKey = (state: RootState) => state.filters.selectedCategory;
const selectSelectedSubcategoryKey = (state: RootState) => state.filters.selectedSubcategory;


function filterBySearch<T extends { name?: string; description?: any }>(
    items: T[],
    query: string
): T[] {
    const lowerQuery = query.toLowerCase();
    return items.filter((item) => {
        if (item.name?.toLowerCase().includes(lowerQuery)) return true;

        if (Array.isArray(item.description)) {
            return item.description.some((desc) => {
                if (typeof desc === 'string') {
                    return desc.toLowerCase().includes(lowerQuery);
                }
                if (desc && typeof desc === 'object' && desc.name) {
                    return desc.name.toLowerCase().includes(lowerQuery);
                }
                return false;
            });
        }

        if (typeof item.description === 'string') {
            return item.description.toLowerCase().includes(lowerQuery);
        }

        return false;
    });
}

export const selectFilteredCategories = createSelector(
    [selectSearchQuery, selectCategoriesData],
    (searchQuery, categoriesData): [string, Category][] => {
        if (!categoriesData || !Object.keys(categoriesData)?.length) return [];

        const query = searchQuery?.toLowerCase() ?? '';
        const matchedKeys = new Set<string>();

        for (const [key, category] of Object.entries(categoriesData)) {
            if (
                category.name?.toLowerCase().includes(query) ||
                category.description?.toLowerCase().includes(query)
            ) {
                matchedKeys.add(key);
                continue;
            }

            if (category.subcategories) {
                for (const subcategory of category.subcategories) {
                    if (subcategory.name?.toLowerCase().includes(query)) {
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
        if (!categoriesData || !selectedCategoryKey) return [];
        const selectedCategory = categoriesData[selectedCategoryKey];
        if (!selectedCategory || !selectedCategory.subcategories) return [];

        const query = searchQuery?.toLowerCase() ?? '';
        if (!query) return selectedCategory.subcategories;

        return filterBySearch(selectedCategory.subcategories, query);
    }
);

export const selectSelectedSubcategory = createSelector(
    [selectCategoriesData, selectSelectedCategoryKey, selectSelectedSubcategoryKey],
    (categoriesData, selectedCategoryKey, selectedSubcategoryKey): Subcategory | undefined => {
        if (!categoriesData || !selectedCategoryKey) return undefined;
        const selectedCategory = categoriesData[selectedCategoryKey];
        if (!selectedCategory || !Array.isArray(selectedCategory.subcategories)) return undefined;

        if (selectedSubcategoryKey) {
            return selectedCategory.subcategories.find((sub) => sub.id === selectedSubcategoryKey);
        }
        return undefined;
    }
);

export const selectFilteredItems = createSelector(
    [selectSearchQuery, selectSelectedSubcategory],
    (searchQuery, selectedSubcategory): Ingredient[] => {
        if (!selectedSubcategory || !Array.isArray(selectedSubcategory.description)) return [];

        const query = searchQuery?.toLowerCase() ?? '';
        if (!query) return selectedSubcategory.description;

        return filterBySearch(selectedSubcategory.description, query);
    }
);