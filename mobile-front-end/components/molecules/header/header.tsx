/** @format */

import { router } from "expo-router";
import React, { FunctionComponent } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { HeaderProps } from "./header.model";

const Header: FunctionComponent<HeaderProps> = ({ previousLinkLabel, previousLink, title, children, style }) => {
    return (
        <View style={style ? style : styles.header}>
            {previousLink && (
                <TouchableOpacity onPress={() => (previousLink ? router.push(previousLink) : router.back())}>
                    <Text style={styles.headerButton}>{previousLinkLabel ? previousLinkLabel : "back"}</Text>
                </TouchableOpacity>
            )}
            <Text style={styles.headerTitle}>{title}</Text>
            {children ? children : <Text style={styles.placeholder}>placeholer</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        padding: 16,
        alignItems: "center",
    },
    headerTitle: {
        fontWeight: "bold",
        fontSize: 32,
        textAlign: "center",
        width: "90%",
    },
    headerButton: {
        color: "green",
        fontSize: 16,
        fontWeight: "500",
    },
    placeholder: {
        display: "none",
    },
});
export default Header;
