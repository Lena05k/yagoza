import React, { useMemo, useState } from "react";
import { View, Text, ScrollView, StyleSheet, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { categoriesData } from "@/data/categoriesData";
import ItemList from "@/components/forCategory/itemList";

export default function CategoryPage() {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const { category, subcategory } = useLocalSearchParams();
    const router = useRouter();

    const selectedCategory = categoriesData[category as string];
    const selectedSubcategory = selectedCategory?.subcategories.find(sub => sub.id === subcategory);

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
                                    <ItemList
                                        key={index}
                                        desc={desc}
                                        onPress={() => router.push(`/categories/${category}/${subcategory}/${desc.id}`)}
                                    />
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
    expandedSubcategoryText: { fontSize: 16, fontWeight: "500", color: "#000", marginVertical: 4 },
    errorText: { fontSize: 18, color: "red", textAlign: "center" },
});

