import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery, setSelectedCategory } from '@/store/filters/filters-slice';
import { selectFilteredSubcategories, selectSelectedCategory } from '@/store/filters/filters-selectors';
import { View, Text, ScrollView, StyleSheet, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Subcategory } from "@/data/categoriesData";
import SubcategoryList from "@/components/forCategory/SubcategoryList";

export default function CategoryPage() {
    const dispatch = useDispatch();
    const router = useRouter();
    const { category } = useLocalSearchParams();
    const selectedCategory = useSelector(selectSelectedCategory);
    const filteredSubcategories = useSelector(selectFilteredSubcategories);
    const [expandedSubcategories, setExpandedSubcategories] = useState<{ [key: string]: boolean }>({});

    useEffect(() => {
        const categoryKey = Array.isArray(category) ? category[0] : category;
        if (categoryKey && typeof categoryKey === 'string') {
            try {
                dispatch(setSelectedCategory(categoryKey));
            } catch (error) {
                console.error('Ошибка при установке категории:', error);
            }
        }
    }, [category, dispatch]);

    const handleSearchChange = (text: string) => {
        try {
            dispatch(setSearchQuery(text));
        } catch (error) {
            console.error('Ошибка при изменении поискового запроса:', error);
        }
    };

    const toggleSubcategory = (id: string) => {
        setExpandedSubcategories((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    if (!selectedCategory) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.errorText}>Категория не найдена</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.innerContainer}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.headerTitle}>{selectedCategory.name}</Text>
                        <Text style={styles.subTitle}>{selectedCategory.description}</Text>
                    </View>
                    <View style={styles.searchContainer}>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Поиск"
                            onChangeText={handleSearchChange}
                        />
                    </View>
                    <View style={styles.categoriesContainer}>
                        {filteredSubcategories.length > 0 ? (
                            filteredSubcategories.map((sub: Subcategory) => {
                                return (
                                    <SubcategoryList
                                        key={sub.id}
                                        id={sub.id}
                                        subcategory={sub}
                                        isExpanded={expandedSubcategories[sub.id]}
                                        toggleCategory={() => toggleSubcategory(sub.id)}
                                        onPress={() => {
                                            try {
                                                if (category && sub.id) {
                                                    router.push(`/categories/${category}/${sub.id}`);
                                                }
                                            } catch (error) {
                                                console.error("Ошибка при переходе:", error);
                                            }
                                        }}
                                    />
                                );
                            })
                        ) : (
                            <Text>Подкатегории не найдены</Text>
                        )}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    innerContainer: { padding: 16 },
    headerContainer: { marginBottom: 12, alignItems: "center" },
    headerTitle: { fontSize: 24, fontWeight: "bold" },
    subTitle: { fontSize: 16, color: "#777", marginTop: 4 },
    searchContainer: {flexDirection: "row", alignItems: "center", backgroundColor: "#f1f1f1", borderRadius: 10, paddingHorizontal: 10, height: 40, marginVertical: 7,},
    searchInput: {flex: 1, fontSize: 17, fontWeight: "400", textAlign: "center", color: "#3C3C4399",},
    categoriesContainer: { marginTop: 16 },
    categoryWrapper: {position: "relative", flexDirection: "row", backgroundColor: "#fff", marginBottom: 12, borderRadius: 8, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 4, shadowOffset: { width: 0, height: 2 },},
    categoryHeader: { alignItems: "center" },
    iconContainer: {flexDirection: "column", borderRadius: 8,},
    categoryIcon: { width: 40, height: 40 },
    categoryTitle: { fontSize: 18, fontWeight: "bold" },
    categoryDescription: { fontSize: 16, color: "#000000" },
    subcategoriesContainer: { backgroundColor: "#EFEFF0", borderRadius: 12, marginLeft: 8, padding: 12, flexGrow: 1 },
    expandedSubcategoryText: { fontSize: 16, fontWeight: 500, color: "#000", marginVertical: 4 },
    collapsedSubcategoryText: { fontSize: 16, fontWeight: 500, color: "#919191", marginVertical: 4 },
    ingredientAmount: { fontSize: 16, fontWeight: 500, color: "#919191", marginVertical: 4, paddingLeft: 10 },
    viewMoreText: { fontSize: 16, fontWeight: 500, color: "#007AFF", marginTop: 8 },
    errorContainer: {flex: 1, justifyContent: "center", alignItems: "center",},
    errorText: {fontSize: 18, color: "red", textAlign: "center",},
});