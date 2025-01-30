import React from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
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
                    {/* Header */}
                    <View style={styles.headerContainer}>
                        <Text style={styles.headerTitle}>Категории</Text>
                    </View>
                    {/* Categories */}
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

{/* Update Quantity */}
{/*<View style={styles.updateContainer}>*/}
{/*    <Text style={styles.updateTitle}>Обновить количество</Text>*/}
{/*    <View style={styles.updateButtonsContainer}>*/}
{/*        <TouchableOpacity style={styles.updateButtonPurple}>*/}
{/*            /!*<DotsGridIcon width={16} height={16} color="purple" />*!/*/}
{/*            <Text style={styles.updateButtonText}>Сканировать</Text>*/}
{/*        </TouchableOpacity>*/}
{/*        <TouchableOpacity style={styles.updateButtonBlue}>*/}
{/*            /!*<Group11Icon width={16} height={16} color="blue" />*!/*/}
{/*            <Text style={styles.updateButtonText}>В ручную</Text>*/}
{/*        </TouchableOpacity>*/}
{/*    </View>*/}
{/*</View>*/}

{/* Recent Updates */}
{/*<View style={styles.recentUpdatesContainer}>*/}
{/*    <View style={styles.recentUpdatesHeader}>*/}
{/*        <Text style={styles.recentUpdatesTitle}>Последние обновления</Text>*/}
{/*        <TouchableOpacity>*/}
{/*            <Text style={styles.viewAll}>все</Text>*/}
{/*        </TouchableOpacity>*/}
{/*    </View>*/}
{/*    <View>*/}
{/*        <Text style={styles.recentUpdateItemTitle}>Кофе - Американо</Text>*/}
{/*        <Text style={styles.recentUpdateItemSubtitle}>Herbarista Bourbon Vanilla...</Text>*/}
{/*    </View>*/}
{/*    <View style={styles.recentUpdateItemContainer}>*/}
{/*        <Text style={styles.recentUpdateItemTitle}>Выпечка</Text>*/}
{/*        <Text style={styles.recentUpdateItemSubtitle}>Круассан с шоколадом</Text>*/}
{/*    </View>*/}
{/*</View>*/}

{/* Footer */}
{/*<View style={styles.footerContainer}>*/}
{/*    <TouchableOpacity>*/}
{/*        /!*<NavigationIconsTsx width={16} height={16} fill="black" />*!/*/}
{/*        <Text style={styles.footerText}>Главная</Text>*/}
{/*    </TouchableOpacity>*/}
{/*    <TouchableOpacity>*/}
{/*        /!*<SecondIcon width={16} height={16} fill="black" />*!/*/}
{/*        <Text style={styles.footerTextInactive}>Категории</Text>*/}
{/*    </TouchableOpacity>*/}
{/*    <TouchableOpacity>*/}
{/*        /!*<FourthIcon width={16} height={16} fill="black" />*!/*/}
{/*        <Text style={styles.footerTextInactive}>Обновить</Text>*/}
{/*    </TouchableOpacity>*/}
{/*    <TouchableOpacity>*/}
{/*        /!*<ThirdIcon width={16} height={16} fill="black" />*!/*/}
{/*        <Text style={styles.footerTextInactive}>Участники</Text>*/}
{/*    </TouchableOpacity>*/}
{/*</View>*/}
