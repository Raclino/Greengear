/** @format */

import { router } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Toast from "react-native-toast-message";

export default function Home() {
    const pages = {
        garden: {
            label: "My Garden",
            icon: require("../asset/icon/garden-icon.png"),
            page: "garden",
        },
        community: {
            label: "Community",
            icon: require("../asset/icon/community-icon.png"),
            page: "community",
        },
        calendar: {
            label: "My Calendar",
            icon: require("../asset/icon/calendar-icon.png"),
            page: "calendar",
        },
        profile: {
            label: "Profile",
            icon: require("../asset/icon/profile-icon.png"),
            page: "profile",
        },
        notification: {
            label: "Notifications",
            icon: require("../asset/icon/notifications-icon.png"),
            page: "notification",
        },
        market: {
            label: "My Market",
            icon: require("../asset/icon/market-icon.png"),
            page: "market",
        },
    };

    const handlePress = (screen: string) => {
        router.push(screen);
    };

    return (
        <View style={styles.container}>
            {Object.entries(pages).map(([pageKey, pageInfo]) => (
                <TouchableOpacity
                    key={pageKey}
                    style={styles.iconContainer}
                    onPress={() => handlePress(pageInfo.page)}
                >
                    <Image
                        source={pageInfo.icon}
                        style={styles.icon}
                    />
                    <Text style={styles.iconText}>{pageInfo.label}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 16,
        justifyContent: "space-evenly",
        marginTop: 100,
        padding: 16,
    },
    iconContainer: {
        alignItems: "center",
        backgroundColor: "#F6F6F6",
        borderRadius: 16,
        padding: 16,
        width: "45%",
    },
    icon: {
        width: 120,
        height: 125,
    },
    iconText: {
        fontSize: 20,
        fontWeight: "600",
        marginTop: 8,
        textAlign: "center",
    },
});
