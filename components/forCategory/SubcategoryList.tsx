import React from "react";
import {View, Text, TouchableOpacity, StyleSheet, Image} from "react-native";
import { Subcategory } from "@/data/categoriesData";

interface SubcategoryListProps {
    id: string;
    subcategory: Subcategory;
    isExpanded: boolean;
    toggleCategory: () => void;
    onPress: () => void;
}

const SubcategoryList: React.FC<SubcategoryListProps> = ({ subcategory, isExpanded, toggleCategory, onPress }) => {
    const descriptionArray = Array.isArray(subcategory.description) ? subcategory.description : [subcategory.description];

    return (
        <TouchableOpacity
            style={styles.categoryWrapper}
            onPress={onPress}
        >
            <View style={styles.iconContainer}>
                <Image source={subcategory.img} style={styles.categoryIcon} />
            </View>
            <View style={styles.subcategoriesContainer}>
                <Text style={styles.categoryTitle}>{subcategory.name}</Text>
                <View>
                    {descriptionArray.map((desc, index) => (
                        <View key={index}>
                            <Text style={[isExpanded ? styles.expandedSubcategoryText : styles.collapsedSubcategoryText]}>
                                • {desc?.name}
                            </Text>
                            {isExpanded && (
                                <Text style={styles.ingredientAmount}>
                                    {desc?.currentAmount} {desc?.unit} из {desc?.totalAmount} {desc?.unit}
                                </Text>
                            )}
                        </View>
                    ))}
                </View>
                <TouchableOpacity onPress={toggleCategory}>
                    <Text style={styles.viewMoreText}>
                        {isExpanded ? "Свернуть" : "Еще"}
                    </Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    categoryWrapper: {position: "relative", flexDirection: "row", backgroundColor: "#fff", marginBottom: 12, borderRadius: 8, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 4, shadowOffset: { width: 0, height: 2 },},
    iconContainer: {flexDirection: "column", borderRadius: 8,},
    categoryIcon: { width: 40, height: 40 },
    categoryTitle: { fontSize: 18, fontWeight: "bold" },
    categoryDescription: { fontSize: 16, color: "#000000" },
    subcategoriesContainer: { backgroundColor: "#EFEFF0", borderRadius: 12, marginLeft: 8, padding: 12, flexGrow: 1 },
    expandedSubcategoryText: { fontSize: 16, fontWeight: 500, color: "#000", marginVertical: 4 },
    collapsedSubcategoryText: { fontSize: 16, fontWeight: 500, color: "#919191", marginVertical: 4 },
    ingredientAmount: { fontSize: 16, fontWeight: 500, color: "#919191", marginVertical: 4, paddingLeft: 10 },
    subcategoryWrapper: { marginBottom: 8 },
    subcategoryTitle: { fontSize: 16, fontWeight: "bold" },
    descriptionText: { fontSize: 14, color: "#777", marginTop: 4 },
    viewMoreText: { color: "#007AFF", marginTop: 4 },
});

export default SubcategoryList;