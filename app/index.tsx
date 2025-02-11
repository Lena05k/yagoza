import React from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Provider } from "react-redux";
import {SafeAreaView} from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { categoriesData } from "@/data/categoriesData";

export default function Index() {
    const router = useRouter();

    const categoryEntries = Object.entries(categoriesData);
    const groupedCategories = [];
    for (let i = 0; i < categoryEntries.length; i += 2) {
        groupedCategories.push(categoryEntries.slice(i, i + 2));
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.innerContainer}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.headerTitle}>Категории</Text>
                    </View>
                    <View style={styles.categoriesContainer}>
                        {groupedCategories.map((group, index) => (
                            <View key={index} style={styles.categoryRow}>
                                {group.map(([key, category]) => (
                                    <TouchableOpacity
                                        key={key}
                                        style={styles.categoryItem}
                                        onPress={() =>
                                            key === "viewAll"
                                                ? router.push("/categories")
                                                : router.push(`/categories/${key}`)
                                        }
                                    >
                                        <View>
                                            <Text style={styles.categoryTitle}>{category.name}</Text>
                                            <Text style={styles.categorySubtitle}>{category.description}</Text>
                                        </View>
                                        <Text style={styles.categoryCount}>
                                            {category.subcategories.length}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    innerContainer: {
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '500',
    },
    categoriesContainer: {
        flexDirection: 'column',
        gap: 4,
    },
    categoryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 4,
    },
    categoryItem: {
        flex: 1,
        maxWidth: '50%',
        padding: 8,
        backgroundColor: '#EFEFF0',
        borderRadius: 8,
        justifyContent: 'space-between',
    },
    categoryTitle: {
        fontSize: 20,
        fontWeight: '700',
    },
    categorySubtitle: {
        fontSize: 16,
        color: '#8E8E93',
    },
    categoryCount: {
        alignSelf: 'flex-end',
        fontSize: 16,
        fontWeight: 'bold',
    },
    updateContainer: {
        marginTop: 32,
    },
    updateTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    updateButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    updateButtonPurple: {
        padding: 16,
        backgroundColor: '#E9D5FF',
        borderRadius: 8,
        alignItems: 'center',
    },
    updateButtonBlue: {
        padding: 16,
        backgroundColor: '#DBEAFE',
        borderRadius: 8,
        alignItems: 'center',
    },
    updateButtonText: {
        fontSize: 12,
        marginTop: 8,
    },
    recentUpdatesContainer: {
        marginTop: 32,
    },
    recentUpdatesHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    recentUpdatesTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    viewAll: {
        color: '#3B82F6',
    },
    recentUpdateItemTitle: {
        fontSize: 18,
    },
    recentUpdateItemSubtitle: {
        fontSize: 14,
        color: '#6B7280',
    },
    recentUpdateItemContainer: {
        marginTop: 16,
    },
    footerContainer: {
        marginTop: 32,
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
        paddingTop: 16,
    },
    footerText: {
        fontSize: 10,
        textAlign: 'center',
    },
    footerTextInactive: {
        fontSize: 10,
        textAlign: 'center',
        color: '#6B7280',
    },
});