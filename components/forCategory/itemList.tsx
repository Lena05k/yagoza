import React from "react";
import {View, Text, TouchableOpacity, StyleSheet, Image} from "react-native";
import ProgressBar from "@/components/ProgressBar";
import { Item } from "@/data/categoriesData";

interface ItemProps {
    desc: Item;
    onPress: () => void;
}

const ItemList: React.FC<ItemProps> = ({ desc, onPress }) => {
    return (
        <TouchableOpacity
            key={desc.id || desc.name}
            style={styles.categoryWrapper}
            onPress={onPress}
        >
            <View style={styles.iconContainer}>
                <Image source={desc.img} style={styles.categoryIcon} />
            </View>

            <View style={styles.subcategoriesContainer}>
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
};

export default ItemList;

const styles = StyleSheet.create({
    categoryWrapper: { flexDirection: "row", backgroundColor: "#fff", marginBottom: 12, borderRadius: 8 },
    iconContainer: { flexDirection: "column", borderRadius: 8 },
    categoryIcon: { width: 40, height: 40 },
    categoryTitle: { fontSize: 20, fontWeight: "bold" },
    categoryId: { color: "#797979", fontSize: 16, fontWeight: 400, paddingTop: 8 },
    subcategoriesContainer: { backgroundColor: "#EFEFF0", borderRadius: 12, marginLeft: 8, padding: 12, flexGrow: 1 },
    expandedSubcategoryText: { fontSize: 16, fontWeight: "500", color: "#000", marginVertical: 4 },
    collapsedSubcategoryText: { fontSize: 16, fontWeight: "500", color: "#919191", marginVertical: 4 },
    weightContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 8},
    remainingWeight: { alignItems: 'flex-start' },
    totalWeight: { alignItems: 'flex-end' },
    weightText: { fontSize: 16, fontWeight: 400 },
    labelText: { fontSize: 16, color: '#919191'}
})