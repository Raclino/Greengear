/** @format */

import React, { useEffect, useState } from "react";
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Header from "../components/molecules/header/header";
import { deleteToken, retrieveToken } from "../helper/jwtToken";
import { router } from "expo-router";

export default function Profile() {
    const [serverError, setServerError] = useState("");
    const [userInfos, setUserInfos] = useState(null);

    const posts = [
        {
            id: "1",
            title: "Astuce composte !",
            content: "Des cendres d'animaux pour les framboises !!",
            time: "8m ago",
        },

        {
            id: "2",
            title: "Tomates malades",
            content: "Mes tomates sont noir charbon, que faire ?",
            time: "8h ago",
        },
    ];

    useEffect(() => {
        (async () => {
            const jwtToken = await retrieveToken();
            if (jwtToken) {
                getInfos(jwtToken);
            } else {
                console.error("JWT token not found");
            }
        })();
    }, []);

    const getInfos = async (jwtToken) => {
        try {
            const response = await fetch(process.env.EXPO_PUBLIC_API_URL + `api/users`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + jwtToken,
                },
            });

            const resData = await response.json();
            console.log("LOG | getInfos | resData:", resData);

            if (!response.ok) {
                throw new Error(resData.message || "Something went wrong!");
            }

            setUserInfos(resData);
        } catch (error) {
            setServerError(error.message);
            Alert.alert("Error", error.message);
        }
    };

    const handleLogout = () => {
        deleteToken();
        router.push("/login");
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.upperPart}>
                <Header
                    previousLink={"/home"}
                    title={"Profile"}
                >
                    <TouchableOpacity onPress={handleLogout}>
                        <Text style={styles.headerButton}>Logout</Text>
                    </TouchableOpacity>
                </Header>
                <Image
                    source={{ uri: process.env.EXPO_PUBLIC_API_URL + userInfos?.imagePath }}
                    style={styles.profileImage}
                />
            </View>
            <Text style={styles.profileName}>{userInfos?.first_name}</Text>
            <Text style={styles.profileMantra}>En faire le moins possible</Text>

            <View style={styles.tabs}>
                <TouchableOpacity style={styles.tab}>
                    <Text style={styles.tabText}>Posts</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tab}>
                    <Text style={styles.tabText}>Photos</Text>
                </TouchableOpacity>
            </View>

            {posts.map((post) => (
                <View
                    key={post.id}
                    style={styles.post}
                >
                    <Text style={styles.postTitle}>{post.title}</Text>
                    <Text style={styles.postContent}>{post.content}</Text>
                    <Text style={styles.postTime}>{post.time}</Text>
                </View>
            ))}
            <View style={styles.buttonWrapper}>
                <TouchableOpacity style={styles.addButton}>
                    <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    upperPart: {
        backgroundColor: "#90EE90",
    },
    headerButton: {
        color: "green",
        fontSize: 16,
        fontWeight: "500",
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        alignSelf: "center",
        marginTop: 30,
        marginBottom: -40,
    },
    profileName: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 50,
        marginVertical: 5,
    },
    profileMantra: {
        fontSize: 16,
        fontStyle: "italic",
        textAlign: "center",
        marginBottom: 20,
    },
    tabs: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginVertical: 10,
    },
    tab: {
        borderColor: "green",
        borderWidth: 1,
        borderRadius: 15,
        padding: 10,
        width: "35%",
    },
    tabText: {
        fontWeight: "bold",
        textAlign: "center",
    },
    post: {
        backgroundColor: "#f2f2f2",
        padding: 15,
        marginHorizontal: 20,
        marginTop: 10,
        borderRadius: 10,
    },
    postTitle: {
        fontWeight: "bold",
    },
    postContent: {
        marginTop: 5,
    },
    postTime: {
        color: "#666",
        fontSize: 12,
        marginTop: 5,
    },
    addButton: {
        backgroundColor: "green",
        borderRadius: 30,
        width: 60,
        height: 60,
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
    },
    addButtonText: {
        color: "white",
        fontSize: 30,
        fontWeight: "bold",
    },
    buttonWrapper: {
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        marginTop: 30,
        width: "100%",
    },
});
