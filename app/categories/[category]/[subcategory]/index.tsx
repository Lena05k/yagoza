import React, { useMemo, useState } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { categoriesData, Category, Subcategory } from "@/data/categoriesData";
import ProgressBar from "@/components/ProgressBar";

export default function CategoryPage() {
    const router = useRouter();
    const { category, subcategory } = useLocalSearchParams();
    const [searchQuery, setSearchQuery] = useState<string>("");

    console.log("subcategoryKey:", subcategory);

    const selectedCategory = categoriesData[category as string];
    const selectedSubcategory = selectedCategory?.subcategories.find(sub => sub.id === subcategory);

    console.log("selectedSubcategory:", selectedSubcategory);

    const filteredItems = useMemo(() => {
        if (!selectedSubcategory || !Array.isArray(selectedSubcategory.description)) return [];
        if (!searchQuery) return selectedSubcategory.description;

        const query = searchQuery.toLowerCase();
        return selectedSubcategory.description.filter(desc =>
            desc.name.toLowerCase().includes(query)
        );
    }, [searchQuery, selectedSubcategory]);

    if (!selectedSubcategory) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.errorText}>Подкатегория не найдена</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.innerContainer}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.headerTitle}>{selectedSubcategory?.name}</Text>
                    </View>

                    <View style={styles.searchContainer}>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Поиск"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                    </View>

                    <View style={styles.categoriesContainer}>
                        {filteredItems.length > 0 ? (
                            filteredItems.map((desc, index) => {
                                return (
                                    <TouchableOpacity
                                        key={desc.id || desc.name}
                                        style={styles.categoryWrapper}
                                        onPress={() => router.push(`/categories/${category}/${subcategory}/${desc.id}`)}
                                    >
                                        <View style={styles.iconContainer}>
                                            <Image source={desc.img} style={styles.categoryIcon} />
                                        </View>

                                        <View key={index} style={styles.subcategoriesContainer}>
                                            <View>
                                                <Text style={styles.categoryTitle}>
                                                    {desc.name}
                                                </Text>
                                                <Text style={styles.categoryId}>{desc.id}</Text>
                                            </View>
                                            <View>
                                                <ProgressBar progress={(desc.currentAmount / desc.totalAmount) * 100} />
                                                <View style={styles.weightContainer}>
                                                    <View style={styles.remainingWeight}>
                                                        <Text style={styles.weightText}>
                                                            {desc.currentAmount} {desc.unit}
                                                        </Text>
                                                        <Text style={styles.labelText}>Осталось</Text>
                                                    </View>
                                                    <View style={styles.totalWeight}>
                                                        <Text style={styles.weightText}>
                                                            {desc.totalAmount} {desc.unit}
                                                        </Text>
                                                        <Text style={styles.labelText}>Всего</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                );
                            })
                        ) : (
                            <Text style={styles.expandedSubcategoryText}>Ингредиенты не найдены</Text>
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
    searchContainer: { flexDirection: "row", alignItems: "center", backgroundColor: "#f1f1f1", borderRadius: 10, paddingHorizontal: 10, height: 40, marginVertical: 7,},
    searchInput: { flex: 1, fontSize: 17, textAlign: "center", color: "#3C3C4399" },
    categoriesContainer: { marginTop: 16 },
    categoryWrapper: { flexDirection: "row", backgroundColor: "#fff", marginBottom: 12, borderRadius: 8 },
    iconContainer: { flexDirection: "column", borderRadius: 8 },
    categoryIcon: { width: 40, height: 40 },
    categoryTitle: { fontSize: 20, fontWeight: "bold" },
    categoryId: { color: "#797979", fontSize: 16, fontWeight: 400, paddingTop: 8 },
    subcategoriesContainer: { backgroundColor: "#EFEFF0", borderRadius: 12, marginLeft: 8, padding: 12, flexGrow: 1 },
    expandedSubcategoryText: { fontSize: 16, fontWeight: "500", color: "#000", marginVertical: 4 },
    collapsedSubcategoryText: { fontSize: 16, fontWeight: "500", color: "#919191", marginVertical: 4 },
    errorText: { fontSize: 18, color: "red", textAlign: "center" },
    weightContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 8},
    remainingWeight: { alignItems: 'flex-start' },
    totalWeight: { alignItems: 'flex-end' },
    weightText: { fontSize: 16, fontWeight: 400 },
    labelText: { fontSize: 16, color: '#919191'}
});
