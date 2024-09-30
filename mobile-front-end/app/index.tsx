/** @format */

import { router } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import greenGearLogo from '../asset/img_tmp/greenGearLogo.png';

export default function Index() {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => router.push("/login")}>
                <Text style={styles.title}>Greengear</Text>
                <Image
                    source={greenGearLogo}
                    style={styles.icon}
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
    },
    icon: {
        width: 350,
        height: 350,
    },
    title: {
        color: "green",
        fontSize: 50,
        fontFamily: "System",
        marginBottom: 40,
        textAlign: "center"
    }
});
