/** @format */

import React from "react";

import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";

export default function Market() {
    const handlePlayVideo = () => { };

    const hotDeals = [
        { id: "1", title: "Buy seeds here", price: "$19.99" },
        { id: "2", title: "Buy fertilizer here", price: "$19.99" },
        { id: "3", title: "Buy seeds here", price: "$19.99" },
    ];

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity>
                    <Text style={styles.headerButton}>Back</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Market</Text>
            </View>

            <TouchableOpacity
                style={styles.videoContainer}
                onPress={handlePlayVideo}
            >
                {/* <Image
          source={require('./path-to-thumbnail.jpg')}
          style={styles.videoThumbnail}
        /> */}
                <View style={styles.playButton}></View>
            </TouchableOpacity>

            <Text style={styles.sectionTitle}>Hot deals</Text>
            <View style={styles.itemContainer}>
                {hotDeals.map((item) => (
                    <View
                        key={item.id}
                        style={styles.item}
                    >
                        <Text style={styles.itemTitle}>{item.title}</Text>
                        <Text style={styles.itemPrice}>{item.price}</Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
    },
    headerButton: {
        color: "green",
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
    },
    videoContainer: {
        aspectRatio: 16 / 9,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ddd",
        margin: 10,
    },
    videoThumbnail: {
        width: "100%",
        height: "100%",
    },
    playButton: {
        // Style for play button icon
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        margin: 10,
    },
    itemContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
    item: {
        backgroundColor: "#eee",
        padding: 10,
        margin: 10,
        width: 100,
        height: 100,
        justifyContent: "center",
        alignItems: "center",
    },
    itemTitle: {
        fontSize: 14,
        fontWeight: "bold",
    },
    itemPrice: {
        fontSize: 12,
    },
});
