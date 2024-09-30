/** @format */

import { Link } from "expo-router";
import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from "expo-router";

const GardenCard = ({ name, info, id, imageUrl, onDelete }) => {
    const navigation = useNavigation();
    const handlePress = () => {
        navigation.navigate('gardenDetails/[id]', { id: id });
    };
    return (
        <View style={styles.card}>
            <TouchableOpacity onPress={handlePress} style={styles.link}>
                <Image source={{ uri: imageUrl }} style={styles.cardImage} />
                <Text style={styles.cardTitle}>{name}</Text>
                <Text style={styles.cardInfo}>{info}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.cardDeleteButton}
                onPress={onDelete}
            >
                <Text style={styles.cardDeleteButtonText}>❌</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        width: "90%",
        margin: 16,
        borderWidth: 1,
        borderColor: "grey",
        borderRadius: 8,
        overflow: "hidden",
        position: "relative",
    },
    link: {
        display: "flex",
        flexDirection: "column"
    },
    cardImage: {
        width: "100%",
        height: 200,
    },
    cardTitle: {
        fontWeight: "bold",
        fontSize: 16,
        padding: 8,
        textAlign: "center",
    },
    cardInfo: {
        padding: 8,
        textAlign: "center",
    },
    cardDeleteButton: {
        position: "absolute",
        right: 10,
        top: 10,
        backgroundColor: "white",
        borderRadius: 15,
        padding: 5,
    },
    cardDeleteButtonText: {
        color: "white",
        fontWeight: "bold",
    },
});

export default GardenCard;
