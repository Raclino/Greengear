/** @format */

import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from "react-native";
import { Link, router, useLocalSearchParams, useNavigation } from "expo-router";
import Header from "../../components/molecules/header/header";
import PlantCard from "../../components/molecules/plantCard/plantCard";
import { retrieveToken } from "../../helper/jwtToken";
import Toast from 'react-native-toast-message';

export default function GardenDetails() {
    const local = useLocalSearchParams();
    const gardenId = Number(local.id);
    const [plants, setPlants] = useState([]);
    const [hub, setHub] = useState(null);
    const [gardenName, setGardenName] = useState(null);
    const navigation = useNavigation();

    const handlePressHubDetails = () => {
        navigation.navigate('hubDetails/[id]', { id: hub.id });
    };

    const fetchGardenDetails = async () => {
        const jwtToken = await retrieveToken();
        if (!jwtToken) {
            Toast.show({
                type: 'error',
                text1: 'Erreur',
                text2: 'JWT token not found'
            });
            return;
        }
        try {
            const response = await fetch(process.env.EXPO_PUBLIC_API_URL + `api/gardens/${gardenId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            });
            if (!response.ok) {
                throw new Error("Failed to fetch garden details");
            }
            const data = await response.json();
            setGardenName(data.garden_name);
            setHub(data.hub);
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Fetch error',
                text2: error.toString()
            });
        }
    };

    const fetchPlants = async () => {
        const jwtToken = await retrieveToken();
        if (!jwtToken) {
            console.error("JWT token not found");
            return;
        }
        try {
            const response = await fetch(process.env.EXPO_PUBLIC_API_URL + `api/plants/garden/${gardenId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            });
            if (!response.ok) {
                throw new Error("Failed to fetch plants");
            }
            const data = await response.json();
            setPlants(data);
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: error.message
            });
        }
    };

    useEffect(() => {
        fetchPlants();
        fetchGardenDetails();
    }, []);

    const onDelete = async (plantId) => {
        const jwtToken = await retrieveToken();
        if (!jwtToken) {
            Toast.show({
                type: 'error',
                text1: 'Erreur',
                text2: 'JWT token not found'
            });
            return;
        }

        try {
            const response = await fetch(`http://localhost:8000/api/plants/${plantId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to delete plant");
            }
            fetchPlants();
            Toast.show({
                type: 'success',
                text1: 'Succès',
                text2: 'Plante supprimée avec succès'
            });
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: error.message
            });
        }
    };

    return (
        <View style={styles.container}>
            <Toast />
            <Header
                title={`${gardenName}`}
                previousLink={"/garden"}
            >
            </Header>
            {hub && (
                <TouchableOpacity
                    onPress={handlePressHubDetails}
                    style={styles.hubButton}
                >
                    <Text style={styles.hubButtonText}>
                        Hub {hub.hub_name} version {hub.hub_version} connecté
                    </Text>
                </TouchableOpacity>
            )}
            <FlatList
                data={plants}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item, index }) => (
                    <PlantCard
                        name={item.plant_name}
                        description={item.plant_description}
                        imageUrl={process.env.EXPO_PUBLIC_API_URL + item.imagePath}
                        onDelete={() => onDelete(item.id)}
                    />
                )}
            />

            <TouchableOpacity
                style={styles.addButton}
                onPress={() => router.push({
                    pathname: "/plantCreation",
                    params: { id: gardenId },
                })}
            >
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    link: {
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center",
    },
    addButton: {
        backgroundColor: "green",
        alignItems: "center",
        justifyContent: "center",
        height: 60,
        width: 60,
        borderRadius: 30,
        alignSelf: "center",
        marginTop: 20,
    },
    addButtonText: {
        color: "white",
        fontSize: 30,
        fontWeight: "bold",
    },
    hubButton: {
        backgroundColor: "#4CAF50",
        padding: 12,
        borderRadius: 8,
        marginVertical: 12,
        marginHorizontal: 10,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    hubButtonText: {
        color: "#FFFFFF",
        fontWeight: "bold",
        textAlign: "center",
    },
});
