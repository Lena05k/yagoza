import React from "react";
import {View, Text, TouchableOpacity, StyleSheet, Image} from "react-native";
import { Category } from "@/data/categoriesData";

interface CategoryListProps {
    id: string;
    category: Category;
    isExpanded: boolean;
    toggleCategory: () => void;
    onPress: () => void;
}

const CategoryList: React.FC<CategoryListProps> = ({ id, category, isExpanded, toggleCategory, onPress }) => {
    const visibleSubcategories = isExpanded ? category.subcategories : category.subcategories.slice(0, 2);

    return (
        <TouchableOpacity
            style={styles.categoryWrapper}
            onPress={onPress}
        >
            <View>
                <View style={styles.iconContainer}>
                    <Image source={category.icon} style={styles.categoryIcon} />
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
                            • {subcategory.name}
                        </Text>
                    ))}
                    {category.subcategories.length > 2 && (
                        <TouchableOpacity onPress={toggleCategory}>
                            <Text style={styles.viewMoreText}>
                                {isExpanded ? "Свернуть" : `Еще ${category.subcategories.length - 2}`}
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default CategoryList;

const styles = StyleSheet.create({
    iconContainer: {flexDirection: "column", backgroundColor: "#EFEFF0", borderRadius: 8, padding: 5,},
    categoryIcon: { width: 32, height: 32 },
    categoryDescription: { fontSize: 16, color: "#000000" },
    categoryWrapper: {position: "relative", flexDirection: "row", backgroundColor: "#fff", marginBottom: 12, borderRadius: 8, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 4, shadowOffset: { width: 0, height: 2 },},
    categoryTitle: { fontSize: 18, fontWeight: "bold" },
    subcategoriesContainer: { backgroundColor: "#EFEFF0", borderRadius: 12, marginLeft: 8, padding: 12, flexGrow: 1 },
    collapsedSubcategoryText: { fontSize: 16, fontWeight: 500, color: "#919191", marginVertical: 4 },
    expandedSubcategoryText: { fontSize: 16, fontWeight: 500, color: "#000", marginVertical: 4 },
    subcategoryText: { fontSize: 16, color: "#555" },
    viewMoreText: { color: "#007AFF", marginTop: 4 },
})