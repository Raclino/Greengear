/** @format */

import React, { useState } from "react";
import { router } from "expo-router";
import { View, Image, Text, TextInput, TouchableOpacity, StyleSheet, Platform, ScrollView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { storeToken } from "../helper/jwtToken";
import Toast from "react-native-toast-message";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Header from "../components/molecules/header/header";

export default function Register() {
    const [user, setUser] = useState({ first_name: "", last_name: "", username: "", email: "", password: "", image: "" });
    const [newsletter, setNewsletter] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);

    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [serverError, setServerError] = useState("");
    const [profileImage, setProfileImage] = useState("");

    const handleRegister = async () => {
        setFirstNameError("");
        setLastNameError("");
        setUsernameError("");
        setEmailError("");
        setPasswordError("");
        setServerError("");

        let isValid = true;
        if (!user.first_name) {
            setFirstNameError("First Name is missing");
            isValid = false;
        }
        if (!user.last_name) {
            setLastNameError("Last Name is missing");
            isValid = false;
        }
        if (!user.username) {
            setUsernameError("Username is missing");
            isValid = false;
        }
        if (!user.email) {
            setEmailError("Email is missing");
            isValid = false;
        }
        if (!user.password) {
            setPasswordError("Password is missing");
            isValid = false;
        }
        user.image = profileImage;
        if (isValid) {
            const formData = new FormData();

            // Ajout des informations de l'utilisateur
            formData.append("first_name", user.first_name);
            formData.append("last_name", user.last_name);
            formData.append("username", user.username);
            formData.append("email", user.email);
            formData.append("password", user.password);

            if (profileImage) {
                if (Platform.OS !== "web") {
                    const uriParts = profileImage.split(".");
                    const fileType = uriParts[uriParts.length - 1];

                    formData.append("image", {
                        uri: profileImage,
                        name: `photo.${fileType}`,
                        type: `image/${fileType}`,
                    });
                } else {
                    const response = await fetch(profileImage);
                    const blob = await response.blob();
                    const file = new File([blob], "filename", { type: "image/jpeg" });

                    formData.append("image", file);
                }
            }

            try {
                const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}api/users`, {
                    method: "POST",
                    body: formData,
                });

                if (!response.ok) {
                    const resData = await response.json();
                    Toast.show({
                        type: "error",
                        text1: "Responce error",
                        text2: resData,
                    });
                    throw new Error("Something went wrong!");
                }
                const data = await response.json();
                await storeToken(data.token);
                Toast.show({
                    type: "success",
                    text1: `Welcome ${user.username} !`,
                });

                router.replace("/home");
            } catch (error) {
                setServerError(error.message);
                Toast.show({
                    type: "error",
                    text1: "Error",
                    text2: error.message,
                });
            }
        }
    };

    const pickImage = async () => {
        if (Platform.OS !== "web") {
            const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (!permissionResult.granted) {
                alert("Permission to access camera roll is required!");
                return;
            }
        }

        const pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!pickerResult.canceled && pickerResult.assets && pickerResult.assets.length > 0) {
            const firstAsset = pickerResult.assets[0];
            setProfileImage(firstAsset.uri);
        }
    };

    const handleInputChange = (field: string, value) => {
        setUser({ ...user, [field]: value });
    };
    const removeImage = () => {
        setProfileImage(null);
    };
    const isFormComplete = user.first_name && user.last_name && user.username && user.email && user.password;

    return (
        <KeyboardAwareScrollView style={{ flex: 1 }}>
            <ScrollView style={styles.container}>
                <Toast />
                <Header title={"Sign up"} />
                <View style={styles.imagePickerContainer}>
                    {!profileImage ? (
                        <TouchableOpacity
                            onPress={pickImage}
                            style={styles.addButton}
                        >
                            <Text style={styles.addButtonText}>+</Text>
                        </TouchableOpacity>
                    ) : (
                        <View style={styles.imageContainer}>
                            <Image
                                source={{ uri: profileImage }}
                                style={styles.profileImage}
                            />
                            <TouchableOpacity
                                onPress={removeImage}
                                style={styles.removeButton}
                            >
                                <Text style={styles.removeButtonText}>×</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
                <TextInput
                    style={styles.input}
                    placeholder="First Name"
                    value={user.first_name}
                    placeholderTextColor="#BDBDBD"
                    onChangeText={(text) => handleInputChange("first_name", text)}
                />
                {firstNameError ? <Text style={styles.errorText}>{firstNameError}</Text> : null}
                <TextInput
                    style={styles.input}
                    placeholder="Last Name"
                    value={user.last_name}
                    placeholderTextColor="#BDBDBD"
                    onChangeText={(text) => handleInputChange("last_name", text)}
                />
                {lastNameError ? <Text style={styles.errorText}>{lastNameError}</Text> : null}
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    placeholderTextColor="#BDBDBD"
                    value={user.username}
                    onChangeText={(text) => handleInputChange("username", text)}
                />

                {usernameError ? <Text style={styles.errorText}>{usernameError}</Text> : null}
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#BDBDBD"
                    value={user.email}
                    onChangeText={(text) => handleInputChange("email", text)}
                    keyboardType="email-address"
                />
                {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={[styles.input, styles.passwordInput]}
                        placeholder="Password"
                        placeholderTextColor="#BDBDBD"
                        value={user.password}
                        onChangeText={(text) => handleInputChange("password", text)}
                        secureTextEntry={!passwordVisible}
                    />
                    <TouchableOpacity
                        onPress={() => setPasswordVisible(!passwordVisible)}
                        style={styles.showPasswordButton}
                    >
                        <Text style={styles.passWordShowText}>{passwordVisible ? "Hide" : "Show"}</Text>
                    </TouchableOpacity>
                    {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
                </View>
                {serverError ? <Text style={styles.serverErrorText}>{serverError}</Text> : null}
                <View style={styles.checkboxContainer}>
                    <TouchableOpacity
                        style={styles.checkbox}
                        onPress={() => setNewsletter(!newsletter)}
                    >
                        <Text style={styles.checkboxLabel}>{newsletter ? "✓" : ""}</Text>
                    </TouchableOpacity>
                    <Text style={styles.label}>I would like to receive your newsletter and other promotional information.</Text>
                </View>
                <TouchableOpacity onPress={() => router.push("/login")}>
                    <Text style={styles.existingLink}>Already have an account? Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, !isFormComplete && styles.buttonLightGreen]}
                    onPress={handleRegister}
                >
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
                {serverError ? <Text style={styles.serverErrorText}>{serverError}</Text> : null}
                <TouchableOpacity>
                    <Text style={styles.existingLink}>Forgot your password?</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    login: {
        display: "flex",
        alignItems: "center",
        color: "green",
        fontSize: 16,
        fontWeight: "600",
        height: 62,
        textAlign: "center",
    },
    input: {
        height: 40,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#E8E8E8",
        borderRadius: 8,
        backgroundColor: "#F6F6F6",
        color: "black",
        padding: 10,
        paddingRight: 60,
    },

    passwordContainer: {
        position: "relative",
    },
    passwordInput: {
        flex: 1,
    },
    showPasswordButton: {
        alignSelf: "flex-end",
        marginRight: 10,
        marginBottom: 10,
        position: "relative",
    },
    passWordShowText: {
        color: "green",
        fontSize: 16,
        fontWeight: "500",
        flexWrap: "wrap",
    },
    checkboxContainer: {
        alignItems: "center",
        fontSize: 14,
        fontWeight: "400",
        flexDirection: "row",
        marginBottom: 43,
        marginTop: 22,
    },
    checkbox: {
        width: 20,
        height: 20,
        marginRight: 8,
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    checkboxLabel: {
        fontSize: 18,
    },
    label: {
        fontSize: 16,
    },
    button: {
        backgroundColor: "green",
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        alignItems: "center",
        marginBottom: 10,
    },
    buttonLightGreen: {
        backgroundColor: "lightgreen",
    },
    buttonText: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    },
    existingLink: {
        color: "green",
        marginTop: 16,
        marginBottom: 16,
        fontSize: 16,
        fontWeight: "600",
        textAlign: "center",
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
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        height: 200,
    },
    addButton: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "#e0e0e0",
        justifyContent: "center",
        alignItems: "center",
    },
    addButtonText: {
        fontSize: 36,
        color: "#000",
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    imageContainer: {
        position: "relative",
        alignItems: "center",
    },
    removeButton: {
        position: "absolute",
        right: -10,
        top: -10,
        backgroundColor: "red",
        width: 24,
        height: 24,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
    },
    removeButtonText: {
        color: "#fff",
        fontSize: 18,
    },
});
