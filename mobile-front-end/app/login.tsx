/** @format */

import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { storeToken } from "../helper/jwtToken";
import { router } from "expo-router";
import Header from "../components/molecules/header/header";
import QRCodeScanner from "../components/molecules/QRCodeScanner/QRCodeScanner";
import MapComponent from "../components/molecules/MapComponent/MapComponent";
import Toast from "react-native-toast-message";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);

    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [loginError, setLoginError] = useState("");
    const [isMapVisible, setIsMapVisible] = useState(false);

    const handleLogin = async () => {
        setUsernameError("");
        setPasswordError("");
        setLoginError("");

        let isValid = true;
        if (!username) {
            setUsernameError("Username is missing");
            isValid = false;
        }
        if (!password) {
            setPasswordError("Password is missing");
            isValid = false;
        }

        if (isValid) {
            try {
                const response = await fetch(process.env.EXPO_PUBLIC_API_URL + "api/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ username, password }),
                });

                if (!response.ok) {
                    setLoginError("Username or password are incorrect");
                    throw new Error("Something went wrong!");
                }

                const data = await response.json();
                storeToken(data.token);
                Toast.show({
                    type: 'success',
                    text1: `Hello ${data.username} !`,
                });
                router.replace("/home");
            } catch (error) {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: error.message,
                });
            }
        }
    };

    const handleRegister = () => {
        router.replace("/register");
    };

    const isFormComplete = username && password;

    return (
        <View style={styles.container}>
            <Toast />
            <Header
                title={"Log In"}
            />
            <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor="#BDBDBD"
                value={username}
                onChangeText={(text) => {
                    setUsername(text);
                    setUsernameError("");
                }}
            />
            {usernameError ? <Text style={styles.errorText}>{usernameError}</Text> : null}
            <View style={styles.passwordContainer}>
                <TextInput
                    style={[styles.input, styles.passwordInput]}
                    placeholder="Password"
                    placeholderTextColor="#BDBDBD"
                    value={password}
                    onChangeText={(text) => {
                        setPassword(text);
                        setPasswordError("");
                    }}
                    secureTextEntry={!passwordVisible}
                />
                <TouchableOpacity
                    onPress={() => setPasswordVisible(!passwordVisible)}
                    style={styles.showPasswordButton}
                >
                    <Text style={styles.passWordShowText}>{passwordVisible ? "Hide" : "Show"}</Text>
                </TouchableOpacity>
            </View>
            {loginError ? <Text style={styles.serverErrorText}>{loginError}</Text> : null}
            {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
            <TouchableOpacity onPress={handleRegister}>
                <Text style={styles.registerLink}>No account? Register</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.button, !isFormComplete && styles.buttonLightGreen]}
                onPress={handleLogin}
            >
                <Text style={styles.buttonText}>Log in</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={styles.forgotPassword}>Forgot your password?</Text>
            </TouchableOpacity>


            {/* <TouchableOpacity
                style={styles.button}
                onPress={() => setIsMapVisible(true)}
            >
                <Text style={styles.buttonText}>Show Map</Text>
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={false}
                visible={isMapVisible}
                onRequestClose={() => {
                    setIsMapVisible(!isMapVisible);
                }}
            >
                <MapComponent />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => setIsMapVisible(false)}
                >
                    <Text style={styles.buttonText}>Close Map</Text>
                </TouchableOpacity>
            </Modal> */}

        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        height: 40,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#E8E8E8",
        padding: 10,
        backgroundColor: "#F6F6F6",
        borderRadius: 8,
        fontSize: 16,
    },
    passwordContainer: {
        position: "relative",
        marginBottom: 16,
    },
    passwordInput: {
        height: 40,
        paddingRight: 60,
        fontSize: 16,
    },
    showPasswordButton: {
        position: "absolute",
        right: 5,
        height: 40,
        justifyContent: "center",
        padding: 10,
    },
    passWordShowText: {
        color: "green",
        fontSize: 16,
        fontWeight: "500",
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
    forgotPassword: {
        color: "green",
        fontSize: 16,
        fontWeight: "600",
        textAlign: "center",
    },
    registerLink: {
        color: "green",
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 16, // Réduit pour équilibrer l'espacement
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
});


