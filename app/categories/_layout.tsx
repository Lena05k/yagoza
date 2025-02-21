import React from "react";
import { Stack } from "expo-router";
import {Provider} from "react-redux";
import { store } from "@/store/store";

export default function Layout() {
    return (
        <Provider store={store}>
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="[category]" options={{ headerShown: false }} />
            </Stack>
        </Provider>
    );
}
