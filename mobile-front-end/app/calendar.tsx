/** @format */

import React from "react";
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Header from "../components/molecules/header/header";
import { Calendar } from "react-native-calendars";

export default function Calaendar() {
    const handleAddTask = () => { };

    const tasks = [
        { key: "1", title: "Arrosage tomates", duration: "30min" },
        { key: "2", title: "Arrosage salades", duration: "2j" },
        { key: "3", title: "Arrosage pommes de terre", duration: "6j" },
        { key: "4", title: "Arrosage aubergines", duration: "15em" },
    ];

    return (
        <ScrollView style={styles.container}>
            <Header
                previousLink={"/home"}
                title={"Calendar"}
            >
                <TouchableOpacity>
                    <Text style={styles.headerButton}>Filter</Text>
                </TouchableOpacity>
            </Header>
            <Calendar />
            <FlatList
                data={tasks}
                renderItem={({ item }) => (
                    <View style={styles.taskItem}>
                        <View style={styles.indicator} />
                        <Text style={styles.taskTitle}>{item.title}</Text>
                        <Text style={styles.taskDuration}>{item.duration}</Text>
                    </View>
                )}
            />

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
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
    taskItem: {
        flexDirection: "row",
        alignItems: "center",
        margin: 20
    },
    indicator: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: "green",
        marginRight: 10,
    },
    taskTitle: {
        fontSize: 16,
    },
    taskDuration: {
        marginLeft: "auto",
        fontSize: 16,
        color: "#666",
    },
    addButton: {
        position: "absolute",
        right: 20,
        bottom: 20,
        backgroundColor: "green",
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
    },
    addButtonText: {
        color: "white",
        fontSize: 30,
        fontWeight: "bold",
    },
});
