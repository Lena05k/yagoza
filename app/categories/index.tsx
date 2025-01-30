import React, { useState, useMemo, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { categoriesData, Category } from "@/data/categoriesData";

export default function Index() {
    const router = useRouter();
    const [expandedCategories, setExpandedCategories] = useState<{ [key: string]: boolean }>({});
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [indexMap, setIndexMap] = useState<Map<string, string>>(new Map());
    const params = useLocalSearchParams();
    console.log("Params:", params);

    const category = params.category ?? "viewAll";  // Если `category` нет, используем `viewAll`
    const categoryKey = Array.isArray(category) ? category[0].toLowerCase() : category.toLowerCase();

    console.log("categoryKey:", categoryKey);
    console.log("categoriesData keys:", Object.keys(categoriesData));

    useEffect(() => {
        const newIndexMap = new Map<string, string>();
        Object.entries(categoriesData).forEach(([key, category]) => {
            newIndexMap.set(category.name.toLowerCase(), key);
            category.subcategories.forEach(subcategory => {
                newIndexMap.set(subcategory.name.toLowerCase(), key);
            });
        });
        setIndexMap(newIndexMap);
    }, [categoriesData]);

    const filteredCategories = useMemo(() => {
        if (!searchQuery) return Object.entries(categoriesData);
        const query = searchQuery.toLowerCase();
        const matchedKeys = new Set<string>();

        for (const [name, key] of indexMap) {
            if (name.includes(query)) {
                matchedKeys.add(key);
            }
        }
        return Object.entries(categoriesData).filter(([key]) => matchedKeys.has(key));
    }, [searchQuery, indexMap]);

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
                    {/* Заголовок */}
                    <View style={styles.headerContainer}>
                        <Text style={styles.headerTitle}>Категории</Text>
                        <Text style={styles.subTitle}>Выберите, создайте или найдите</Text>
                    </View>
                    <View style={styles.searchContainer}>
                        {/*<Image source={require("./search-icon.png")} style={styles.searchIcon} />*/}
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Поиск"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                    </View>
                    {/* Список категорий */}
                    <View style={styles.categoriesContainer}>
                        {filteredCategories.map(([key, category]) => {
                            const isExpanded = expandedCategories[key];
                            const visibleSubcategories = isExpanded
                                ? category.subcategories
                                : category.subcategories.slice(0, 2);

                            return (
                                <TouchableOpacity
                                    key={key}
                                    style={styles.categoryWrapper}
                                    onPress={() => {
                                        if (key !== "viewAll") {
                                            router.push(`/categories/${key}`);
                                        }
                                    }}
                                >
                                    <View>
                                        <View style={styles.iconContainer}>
                                            <Image
                                                source={category.icon}
                                                style={styles.categoryIcon}
                                            />
                                        </View>
                                        <View></View>
                                    </View>
                                    <View style={styles.subcategoriesContainer}>
                                        <View>
                                            <Text style={styles.categoryTitle}>{category.name}</Text>
                                            <Text style={styles.categoryDescription}>{category.description}</Text>
                                        </View>
                                        <View>
                                            {visibleSubcategories.map((subcategory) => (
                                                <Text key={subcategory.id} style={[isExpanded ? styles.expandedSubcategoryText : styles.collapsedSubcategoryText]}>
                                                    {subcategory.name}
                                                </Text>
                                            ))}
                                            {category.subcategories.length > 2 && (
                                                <TouchableOpacity onPress={() => toggleCategory(key)}>
                                                    <Text style={styles.viewMoreText}>
                                                        {isExpanded ? "Свернуть" : `Еще ${category.subcategories.length - 2}`}
                                                    </Text>
                                                </TouchableOpacity>
                                            )}
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            );
                        })}
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
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f1f1f1",
        borderRadius: 10,
        paddingHorizontal: 10,
        height: 40,
        marginVertical: 7,
    },
    searchInput: {
        flex: 1,
        fontSize: 17,
        fontWeight: "400",
        textAlign: "center",
        color: "#3C3C4399",
    },
    categoriesContainer: { marginTop: 16 },
    categoryWrapper: {
        position: "relative",
        flexDirection: "row",
        backgroundColor: "#fff",
        marginBottom: 12,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },
    categoryHeader: { alignItems: "center" },
    iconContainer: {
        flexDirection: "column",
        backgroundColor: "#EFEFF0",
        borderRadius: 8,
        padding: 5,
    },
    categoryIcon: { width: 32, height: 32 },
    // categoryContent: { flex: 1 },
    // subcategory: { flex: 1 },
    categoryTitle: { fontSize: 18, fontWeight: "bold" },
    categoryDescription: { fontSize: 16, color: "#000000" },
    subcategoriesContainer: { backgroundColor: "#EFEFF0", borderRadius: 12, marginLeft: 8, padding: 12, flexGrow: 1 },
    expandedSubcategoryText: { fontSize: 16, fontWeight: 500, color: "#000", marginVertical: 4 },
    collapsedSubcategoryText: { fontSize: 16, fontWeight: 500, color: "#919191", marginVertical: 4 },
    viewMoreText: { fontSize: 16, fontWeight: 500, color: "#007AFF", marginTop: 8 },
    errorContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    errorText: {
        fontSize: 18,
        color: "red",
        textAlign: "center",
    },
});

