/** @format */

import React, { useEffect, useState } from "react";
import { Alert, FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import GardenCard from "../components/molecules/gardenCard/gardenCard";
import Header from "../components/molecules/header/header";
import { retrieveToken } from "../helper/jwtToken";
import { router, Link } from "expo-router";

export default function Garden() {
    const [serverError, setServerError] = useState("");
    const [gardens, setGardens] = useState(null);

    useEffect(() => {
        (async () => {
            const jwtToken = await retrieveToken();
            if (jwtToken) {
                getGardens(jwtToken);
            } else {
                console.error("JWT token not found");
            }
        })();
    }, []);

    const getGardens = async (jwtToken) => {
        try {
            const response = await fetch(process.env.EXPO_PUBLIC_API_URL + `api/gardens`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + jwtToken,
                },
            });

            const resData = await response.json();

            if (!response.ok) {
                throw new Error(resData.message || "Something went wrong!");
            }

            const transformedGardens = resData.map((garden, index) => ({
                id: garden.id.toString(),
                name: garden.garden_name,
                info: "Informations about your garden",
                imageUrl: garden?.imagePath,
            }));

            setGardens(transformedGardens);
        } catch (error) {
            setServerError(error.message);
            Alert.alert("Error", error.message);
        }
    };

    const handleDeleteGarden = async (gardenName: string, gardenId: number) => {
        const jwtToken = await retrieveToken();

        if (!jwtToken) {
            console.error("JWT token not found");
            return;
        }

        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}api/gardens/${gardenId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + jwtToken,
                },
                body: JSON.stringify({ garden_name: gardenName }),
            });

            if (!response.ok) {
                const resData = await response.json();
                throw new Error(resData.message || "Error deleting garden");
            }

            setGardens(gardens.filter((garden) => garden.id !== gardenId.toString()));
        } catch (error) {
            setServerError(error.message);
            Alert.alert("Error", error.message);
        }
    };

    const handleAddPlant = () => {
        router.push("/gardenCreation"); //TODO create a dynamic form with wheather, gps, descriptions, modules, sensors infos  etc
    };

    const renderItem = ({ item }) => (
        <GardenCard
            name={item.name}
            id={item.id}
            info={item.info}
            imageUrl={process.env.EXPO_PUBLIC_API_URL + item.imageUrl}
            onDelete={() => handleDeleteGarden(item.name, item.id)}
        />
    );

    return (
        <View style={styles.container}>
            <Header
                previousLink={"/home"}
                title={"My Garden"}
            ></Header>
            <FlatList
                data={gardens}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={
                    <TextInput
                        placeholder="Search"
                        style={styles.searchInput}
                        // onChangeText={handleSearch}
                    />
                }
                ListFooterComponent={
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.addButton}
                            onPress={handleAddPlant}
                        >
                            <Text style={styles.addButtonText}>+</Text>
                        </TouchableOpacity>
                    </View>
                }
            />
            {serverError ? <Text style={styles.serverErrorText}>{serverError}</Text> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerButton: {
        color: "green",
        fontSize: 16,
        fontWeight: "500",
    },
    searchInput: {
        height: 40,
        margin: 16,
        borderWidth: 1,
        borderColor: "#E8E8E8",
        padding: 10,
        paddingRight: 60,
        backgroundColor: "#F6F6F6",
        borderRadius: 8,
    },
    buttonContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 8,
        width: "100%",
    },
    addButton: {
        backgroundColor: "green",
        alignItems: "center",
        borderRadius: 30,
        justifyContent: "center",
        height: 60,
        width: 60,
    },
    addButtonText: {
        color: "white",
        fontSize: 30,
        fontWeight: "bold",
    },
    serverErrorText: {
        color: "red",
        fontSize: 14,
        textAlign: "center",
        marginBottom: 10,
    },
});
