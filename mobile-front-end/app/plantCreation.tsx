/** @format */

import React, { useEffect, useState } from "react";
import { Image, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View, Platform } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import Header from "../components/molecules/header/header";
import { retrieveToken } from "../helper/jwtToken";
import Toast from "react-native-toast-message";
import * as ImagePicker from 'expo-image-picker';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function PlantCreation() {
    const local = useLocalSearchParams();
    const gardenId = Number(local.id);
    const [plantName, setPlantName] = useState("");
    const [description, setDescription] = useState("");
    const [creationError, setCreationError] = useState("");
    const [image, setImage] = useState(null);

    const handleCreation = async () => {
        const jwtToken = await retrieveToken();

        if (!jwtToken) {
            Toast.show({
                type: 'error',
                text1: 'Erreur',
                text2: "JWT token not found"
            });
            return;
        }
        const formData = new FormData();
        formData.append('gardenId', gardenId + "");
        formData.append('plant_name', plantName);
        formData.append('plant_description', description);
        if (image) {
            let uriParts = image.split('.');
            let fileType = uriParts[uriParts.length - 1];

            if (Platform.OS !== 'web') {
                formData.append('image', {
                    uri: image,
                    name: `photo.${fileType}`,
                    type: `image/${fileType}`,
                });
            } else {
                const response = await fetch(image);
                const blob = await response.blob();
                const file = new File([blob], `filename`, { type: `image/${fileType}` })
                formData.append('image', file);
            }
        }
        try {
            const response = await fetch(process.env.EXPO_PUBLIC_API_URL + "api/plants", {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + jwtToken
                },
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                Toast.show({
                    type: 'error',
                    text1: 'Erreur',
                    text2: errorData.message
                });
                throw new Error("Something went wrong!");
            }

            router.replace(`/gardenDetails/${gardenId}`);
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Erreur',
                text2: error.message
            });
        }
    };
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled && result.assets) {
            const firstAsset = result.assets[0];
            setImage(firstAsset.uri);
        }
    };
    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);
    return (
        <KeyboardAwareScrollView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Toast />
                <Header
                    previousLink={"/garden"}
                    title={"New plant"}
                >
                </Header>
                <TextInput
                    style={styles.input}
                    placeholder="Name of the plant"
                    placeholderTextColor="#BDBDBD"
                    value={plantName}
                    onChangeText={(text) => {
                        setPlantName(text);
                    }}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Description of your plant"
                    placeholderTextColor="#BDBDBD"
                    value={description}
                    onChangeText={(text) => {
                        setDescription(text);
                    }}
                />
                {creationError ? <Text style={styles.errorText}>{creationError}</Text> : null}
                <View style={styles.imagePickerContainer}>
                    <TouchableOpacity onPress={pickImage} style={styles.imagePickerButton}>
                        <Text style={styles.imagePickerButtonText}>Select a Plant Picture</Text>
                    </TouchableOpacity>
                    {image && <Image
                        source={{ uri: image }}
                        style={styles.image} />}
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleCreation}
                >
                    <Text style={styles.buttonText}>Create</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        height: 40,
        marginBottom: 24,
        marginTop: 16,
        borderWidth: 1,
        borderColor: "#E8E8E8",
        padding: 10,
        paddingRight: 60,
        backgroundColor: "#F6F6F6",
        borderRadius: 8,
    },
    button: {
        backgroundColor: "green",
        padding: 10,
        alignItems: "center",
        marginBottom: 16,
        borderRadius: 8,
    },
    buttonText: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    },
    buttonLightGreen: {
        backgroundColor: "lightgreen",
    },
    errorText: {
        color: "red",
        fontSize: 12,
        marginBottom: 10,
    },
    serverErrorText: {
        color: "red",
        fontSize: 14,
        textAlign: "center",
        marginBottom: 10,
    },
    imagePickerContainer: {
        alignItems: 'center',
        marginBottom: 20,
        width: '100%',
    },
    imagePickerButton: {
        backgroundColor: "#4CAF50",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    imagePickerButtonText: {
        color: "white",
        fontSize: 16,
    },
    image: {
        width: "90%",
        height: 200,
        borderRadius: 8,
        marginTop: 10,
    },
});
