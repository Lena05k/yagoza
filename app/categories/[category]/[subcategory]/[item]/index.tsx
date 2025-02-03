import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { categoriesData } from "@/data/categoriesData";
import ProgressBar from "@/components/ProgressBar";

export default function DescriptionPage() {
    const params = useLocalSearchParams();
    const { category, subcategory, item } = params;

    console.log('params:', params);

    const selectedCategory = categoriesData[category as string];
    const selectedSubcategory = selectedCategory?.subcategories.find(sub => sub.id === subcategory);

    const selectedDescription = Array.isArray(selectedSubcategory?.description)
        ? selectedSubcategory.description.find(desc => {
            return desc.id === item;
        })
        : undefined;

    console.log("selectedCategory:", selectedDescription);

    if (!selectedDescription) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.errorText}>Продукт не найден</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>{selectedDescription.name}</Text>
            <View style={styles.imageContainer}>
                <Image source={selectedDescription.img} style={styles.productImage} />
            </View>
            <View>
                <Text style={styles.collTitle}>Колличество</Text>
                <View style={styles.progressContainer}>
                    <ProgressBar
                        progress={selectedDescription.currentAmount / selectedDescription.totalAmount * 100}
                    />
                    <View style={styles.weightContainer}>
                        <View style={styles.remainingWeight}>
                            <Text style={styles.weightText}>
                                {selectedDescription.currentAmount}  {selectedDescription.unit}
                            </Text>
                            <Text style={styles.labelText}>Осталось</Text>
                        </View>
                        <View style={styles.totalWeight}>
                            <Text style={styles.weightText}>
                                {selectedDescription.totalAmount} {selectedDescription.unit}
                            </Text>
                            <Text style={styles.labelText}>Всего</Text>
                        </View>
                    </View>

                    <View style={styles.usageContainer}>
                        <Text style={styles.usageText}>За сутки </Text>
                        <Text style={styles.usageText}>За 7 дней </Text>
                    </View>
                </View>

            </View>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Изменить количество</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: "#fff" },
    header: { fontSize: 20, fontWeight: "bold", textAlign: "center", marginBottom: 16 },
    collTitle: { fontSize: 20, fontWeight: 500, marginBottom: 12 },
    imageContainer: { alignItems: "center", marginBottom: 20, backgroundColor: "#EFEFF0", borderRadius: 12, padding: 8 },
    productImage: { width: 200, height: 200, resizeMode: "contain" },
    progressContainer: { padding: 12, backgroundColor: "#f5f5f5", borderRadius: 12 },
    progressBar: { height: 10, borderRadius: 5, backgroundColor: "#ddd" },
    amountContainer: { flexDirection: "row", justifyContent: "space-between", marginTop: 4 },
    amountText: { fontSize: 16, fontWeight: "bold" },
    subText: { fontSize: 14, color: "#777", textAlign: "left" },
    weightContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 8},
    remainingWeight: { alignItems: 'flex-start' },
    totalWeight: { alignItems: 'flex-end' },
    weightText: { fontSize: 16, fontWeight: 400 },
    labelText: { fontSize: 16, color: '#919191'},
    usageContainer: { marginTop: 16 },
    usageText: { fontSize: 16, color: "#000", fontWeight: 400, textAlign: "left", marginVertical: 2 },
    button: { backgroundColor: "#3E7DFE", padding: 12, borderRadius: 12, marginTop: 16, alignItems: "center" },
    buttonText: { color: "#fff", fontSize: 20, fontWeight: 700 }
});
