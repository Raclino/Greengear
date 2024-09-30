/** @format */

import { useState } from "react";
import React from "react";

import { View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import Header from "../components/molecules/header/header";

export default function Community() {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const topics = [{ id: "1", title: "Topic #1", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." }, { id: "2", title: "Topic #1", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." }, { id: "3", title: "Topic #3", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." }, { id: "4", title: "Topic #4", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." }];

    const renderItem = ({ item }) => (
        <View style={styles.topicContainer}>
            <Text style={styles.topicTitle}>{item.title}</Text>
            <Text style={styles.topicContent}>{item.content}</Text>
            <Text style={styles.topicTime}>8m ago</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Header
                previousLink={"/home"}
                title={"Community"}
            >
                <TouchableOpacity>
                    <Text style={styles.headerButton}>Filter</Text>
                </TouchableOpacity>
            </Header>
            <TextInput
                placeholder="Search"
                value={searchQuery}
                onChangeText={handleSearch}
                style={styles.searchInput}
            />
            <FlatList
                data={topics}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
            <TouchableOpacity style={styles.newPostButton}>
                <Text style={styles.newPostText}>New Post +</Text>
            </TouchableOpacity>
        </SafeAreaView>
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
        fontWeight: "bold",
        fontSize: 20,
    },
    searchInput: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    topicContainer: {
        backgroundColor: "#f2f2f2",
        padding: 15,
        marginHorizontal: 20,
        marginTop: 10,
        borderRadius: 10,
    },
    topicTitle: {
        fontWeight: "bold",
    },
    topicContent: {
        marginTop: 5,
    },
    topicTime: {
        color: "#666",
        fontSize: 12,
        marginTop: 5,
    },
    newPostButton: {
        position: "absolute",
        right: 30,
        bottom: 30,
        backgroundColor: "green",
        borderRadius: 30,
        width: 60,
        height: 60,
        alignItems: "center",
        justifyContent: "center",
    },
    newPostText: {
        color: "white",
        fontSize: 14,
        fontWeight: "bold",
    },
});
