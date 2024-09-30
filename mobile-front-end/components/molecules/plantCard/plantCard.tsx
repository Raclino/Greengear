/** @format */

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

const PlantCard = ({ name, description, onDelete, imageUrl }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.description}>{description}</Text>
            <Image
                source={{ uri: imageUrl }}
                style={styles.plantImage}
            />
            <TouchableOpacity
                style={styles.deleteButton}
                onPress={onDelete}
            >
                <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: "white",
        borderColor: "#90ee90",
        borderWidth: 2,
        borderRadius: 15,
        padding: 10,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    plantImage: {
        borderRadius: 20,
        marginBottom: 30,
        width: "100%",
        height: 200,
    },
    name: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 18,
    },
    description: {
        textAlign: "center",
        fontSize: 14,
        marginTop: 5,
        marginBottom: 10,
    },
    deleteButton: {
        marginTop: 10,
        backgroundColor: "red",
        padding: 10,
        borderRadius: 5,
    },
    deleteButtonText: {
        color: "white",
        textAlign: "center",
    },
});

export default PlantCard;
