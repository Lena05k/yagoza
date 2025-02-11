import { Tabs } from "expo-router";
import { Provider } from "react-redux";
import CustomIcon from "@/components/IconLibrary";
import { store } from "@/store/store";

export default function Layout() {
    return (
        <Provider store={store}>
            <Tabs screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "black",
                tabBarInactiveTintColor: "#8E8E93",
                tabBarStyle: {
                    backgroundColor: "#EFEFF0",
                    borderTopWidth: 0,
                    paddingVertical: 10,
                    height: 60,
                },
                tabBarLabelStyle: {
                    fontSize: 14,
                    fontWeight: 400,
                },
            }}>
                <Tabs.Screen
                    name="index"
                    options={{
                        title: "Главная",
                        tabBarIcon: ({ color, size, focused }) => <CustomIcon name="home" color={focused ? "black" : "#8E8E93"} size={size} />,
                    }}
                />

                <Tabs.Screen
                    name="categories"
                    options={{
                        title: "Категории",
                        tabBarIcon: ({ color, size, focused }) => <CustomIcon name="list" color={focused ? "black" : "#8E8E93"} size={size} />,
                    }}
                />
                {/*<Tabs.Screen*/}
                {/*    name="update"*/}
                {/*    options={{*/}
                {/*        title: "Обновить",*/}
                {/*    }}*/}
                {/*/>*/}
                {/*<Tabs.Screen*/}
                {/*    name="participants"*/}
                {/*    options={{*/}
                {/*        title: "Участвики",*/}
                {/*    }}*/}
                {/*/>*/}
            </Tabs>
        </Provider>
    );
}
