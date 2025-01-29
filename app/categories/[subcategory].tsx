import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function Subcategory() {
    const { subcategory } = useLocalSearchParams();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Подкатегория: {subcategory}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center" },
    title: { fontSize: 24, fontWeight: "bold" },
});
