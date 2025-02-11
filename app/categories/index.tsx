import React, { useState, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setSearchQuery } from '@/store/filters/filters-slice';
import { selectFilteredCategories } from '@/store/filters/filters-selectors';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { categoriesData, Category } from "@/data/categoriesData";
import CategoryList from "@/components/forCategory/CategoryList";
import { setCategoriesData } from "@/store/categories/categories-slice";

export default function Index() {
    const router = useRouter();
    const dispatch = useDispatch();
    const [expandedCategories, setExpandedCategories] = useState<{ [key: string]: boolean }>({});
    const filteredCategories = useSelector(selectFilteredCategories);

    useEffect(() => {
        dispatch(setCategoriesData(categoriesData));
    }, [dispatch])

    const handleSearchChange = (text: string) => {
        dispatch(setSearchQuery(text));
    };

    const toggleCategory = (key: string) => {
        setExpandedCategories((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    if (!categoriesData || typeof categoriesData !== "object" || Object.keys(categoriesData).length === 0) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>Ошибка: категории отсутствуют или повреждены</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.innerContainer}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.headerTitle}>Категории</Text>
                        <Text style={styles.subTitle}>Выберите, создайте или найдите</Text>
                    </View>
                    <View style={styles.searchContainer}>
                        {/*<Image source={require("./search-icon.png")} style={styles.searchIcon} />*/}
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Поиск"
                            onChangeText={handleSearchChange}
                        />
                    </View>
                    <View style={styles.categoriesContainer}>
                        {filteredCategories.map(([key, category]) => (
                            <CategoryList
                                key={key}
                                id={key}
                                category={category}
                                isExpanded={expandedCategories[key]}
                                toggleCategory={() => toggleCategory(key)}
                                onPress={() => {
                                    if (key !== "viewAll") {
                                        router.push(`/categories/${key}`);
                                    }
                                }}
                            />
                            ))}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    innerContainer: { padding: 16 },
    headerContainer: { marginBottom: 16, alignItems: "center" },
    headerTitle: { fontSize: 24, fontWeight: "bold" },
    subTitle: { fontSize: 16, color: "#777", marginTop: 4 },
    searchContainer: {flexDirection: "row", alignItems: "center", backgroundColor: "#f1f1f1", borderRadius: 10, paddingHorizontal: 10, height: 40, marginVertical: 7,},
    searchInput: {flex: 1, fontSize: 17, fontWeight: "400", textAlign: "center", color: "#3C3C4399",},
    categoriesContainer: { marginTop: 16 },
    categoryDescription: { fontSize: 16, color: "#000000" },
    errorContainer: {flex: 1, justifyContent: "center", alignItems: "center",},
    errorText: {fontSize: 18, color: "red", textAlign: "center",},
});


// const category = params.category ?? "viewAll";
// const categoryKey = Array.isArray(category) ? category[0].toLowerCase() : category.toLowerCase();

// useEffect(() => {
//     const newIndexMap = new Map<string, string>();
//     Object.entries(categoriesData).forEach(([key, category]) => {
//         newIndexMap.set(category.name.toLowerCase(), key);
//         category.subcategories.forEach(subcategory => {
//             newIndexMap.set(subcategory.name.toLowerCase(), key);
//         });
//     });
//     setIndexMap(newIndexMap);
// }, [categoriesData]);

// const [searchQuery, setSearchQuery] = useState<string>("");
// const [indexMap, setIndexMap] = useState<Map<string, string>>(new Map());
// const params = useLocalSearchParams();

// const filteredCategories = useMemo(() => {
//     if (!searchQuery) return Object.entries(categoriesData);
//     const query = searchQuery.toLowerCase();
//     const matchedKeys = new Set<string>();
//
//     for (const [name, key] of indexMap) {
//         if (name.includes(query)) {
//             matchedKeys.add(key);
//         }
//     }
//     return Object.entries(categoriesData).filter(([key]) => matchedKeys.has(key));
// }, [searchQuery, indexMap]);