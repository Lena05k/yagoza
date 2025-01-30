import React from "react";
import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { categoriesData } from "@/data/categoriesData";

export default function SubcategoryPage() {
    const { category, subcategory } = useLocalSearchParams();

    console.log("Params:", { category, subcategory });

    const categoryKey = Array.isArray(category) ? category[0].toLowerCase() : category.toLowerCase();
    const subcategoryKey = Array.isArray(subcategory) ? subcategory[0].toLowerCase() : subcategory.toLowerCase();

    const selectedCategory = categoriesData[categoryKey];
    const selectedSubcategory = selectedCategory?.subcategories.find(sub => sub.id === subcategoryKey);

    if (!selectedSubcategory) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.errorText}>Подкатегория "{subcategoryKey}" не найдена</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Text style={styles.header}>{selectedSubcategory.name}</Text>

                {selectedSubcategory.description && (
                    <Text style={styles.description}>{selectedSubcategory.description}</Text>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff", padding: 16 },
    header: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
    description: { fontSize: 16, color: "#333", marginBottom: 10 },
    image: { width: "100%", height: 200, borderRadius: 10, marginBottom: 10 },
    errorText: { fontSize: 18, color: "red", textAlign: "center", marginTop: 50 },
});
