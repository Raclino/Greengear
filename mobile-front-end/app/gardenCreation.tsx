/** @format */

import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, Modal, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Header from "../components/molecules/header/header";
import { retrieveToken } from "../helper/jwtToken";
import { storeToken } from "../helper/jwtToken";
import QRCodeScanner from "../components/molecules/QRCodeScanner/QRCodeScanner";
import Toast from "react-native-toast-message";
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function GardenCreation() {
    const [gardenName, setGardenName] = useState("");
    const [creationError, setCreationError] = useState("");
    const [isScannerVisible, setIsScannerVisible] = useState(false);
    const [hubToken, setHubToken] = useState("");
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
        formData.append('garden_name', gardenName);

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
            const gardenResponse = await fetch(process.env.EXPO_PUBLIC_API_URL + "api/gardens", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + jwtToken
                },
                body: formData,
            });

            if (!gardenResponse.ok) {
                const errorData = await gardenResponse.json();
                Toast.show({
                    type: 'error',
                    text1: 'Erreur',
                    text2: errorData.message
                });
                setCreationError("Garden creation failed: " + errorData.message);
                return;
            }
            if (hubToken != "") {
                const gardenData = await gardenResponse.json();
                const linkResponse = await fetch(process.env.EXPO_PUBLIC_API_URL + "api/hub/link-garden", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + jwtToken,
                    },
                    body: JSON.stringify({ garden_id: gardenData.id, hub_token: hubToken }),
                });

                if (!linkResponse.ok) {
                    const errorData = await linkResponse.json();
                    Toast.show({
                        type: 'error',
                        text1: 'Erreur',
                        text2: errorData.message
                    });
                    setCreationError("Linking garden to hub failed: " + errorData.message);
                    return;
                }
                Toast.show({
                    type: 'success',
                    text1: 'Success',
                    text2: 'Garden created and linked to hub successfully!'
                });
            }
            router.replace("/garden");
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Erreur',
                text2: error.message
            });
        }
    };

    const handleQRCodeScanned = (scannedData) => {
        try {
            if (!scannedData) {
                Toast.show({
                    type: 'error',
                    text1: 'Erreur',
                    text2: 'Le QR code scanné ne contient pas de token valide.'
                });
                return;
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Erreur de Scan',
                text2: 'Les données scannées ne sont pas au format JSON attendu.'
            });
            return;
        }

        setIsScannerVisible(false);
        setHubToken(scannedData);
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
    const isFormComplete = gardenName.length > 0;

    return (
        <KeyboardAwareScrollView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Toast />
                <Header
                    previousLink={"/garden"}
                    title={"Garden creation"}
                >
                </Header>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Garden name"
                        placeholderTextColor="#BDBDBD"
                        value={gardenName}
                        onChangeText={(text) => {
                            setGardenName(text);
                        }}
                    />
                </View>
                <View style={styles.inputContainer}>

                    <TextInput
                        style={[styles.input, { flex: 1 }]}
                        placeholder="Hub Token"
                        placeholderTextColor="#BDBDBD"
                        value={hubToken}
                        onChangeText={(text) => {
                            setHubToken(text);
                        }}
                    />
                    <TouchableOpacity onPress={() => setIsScannerVisible(true)}>
                        <FontAwesome name="camera" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                {creationError ? <Text style={styles.serverErrorText}>{creationError}</Text> : null}
                <View style={styles.imagePickerContainer}>
                    <TouchableOpacity onPress={pickImage} style={styles.imagePickerButton}>
                        <Text style={styles.imagePickerButtonText}>Select a Garden Picture</Text>
                    </TouchableOpacity>
                    {image && <Image
                        source={{ uri: image }}
                        style={styles.image} />}
                </View>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={isScannerVisible}
                    onRequestClose={() => {
                        setIsScannerVisible(!isScannerVisible);
                    }}
                >
                    <QRCodeScanner onTokenScanned={handleQRCodeScanned} />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => setIsScannerVisible(false)}
                    >
                        <Text style={styles.buttonText}>Close Scanner</Text>
                    </TouchableOpacity>
                </Modal>
                <TouchableOpacity
                    style={[styles.button, !isFormComplete && styles.buttonLightGreen]}
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
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
        marginTop: 16,
        borderWidth: 1,
        borderColor: "#E8E8E8",
        padding: 10,
        paddingRight: 10,
        backgroundColor: "#F6F6F6",
        borderRadius: 8,
    },
    input: {
        flex: 1,
        marginRight: 10,
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
