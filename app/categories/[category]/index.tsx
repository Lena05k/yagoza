import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { categoriesData, Category, Subcategory  } from "@/data/categoriesData";

export default function CategoryPage() {
    const { category } = useLocalSearchParams();
    const router = useRouter();

    const categoryKey = Array.isArray(category) ? category[0] : category;
    const selectedCategory: Category | undefined = categoriesData[categoryKey];

    if (!selectedCategory) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.errorText}>Подкатегория не найдена</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Text style={styles.header}>{selectedCategory.name}</Text>
                {selectedCategory.subcategories.map((sub: Subcategory) => (
                    <TouchableOpacity
                        key={sub.id}
                        style={styles.subcategoryContainer}
                        onPress={() => router.push(`/categories/${categoryKey}/${sub.id}`)}
                    >
                        <Text style={styles.subcategoryName}>{sub.name}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff", padding: 16 },
    header: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
    subcategoryContainer: { flexDirection: "row", alignItems: "center", padding: 12, backgroundColor: "#f8f8f8", marginVertical: 6, borderRadius: 8 },
    subcategoryName: { fontSize: 18, marginLeft: 10 },
    icon: { width: 40, height: 40, borderRadius: 20 },
    errorText: { fontSize: 18, color: "red", textAlign: "center", marginTop: 50 },
});
