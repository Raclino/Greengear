/** @format */

import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import Header from "../components/molecules/header/header";
import NotificationForm from "../components/organism/NotificationForm/NotificationForm";
import { NewNotification } from "../components/organism/NotificationForm/NotificationForm.model";
import { registerForPushNotificationsAsync } from "../helper/permissions";

export default function Notifications() {
    const [notifications, setNotifications] = useState<NewNotification[]>([]);
    const [isFormVisible, setFormVisible] = useState<boolean>(false);


    const toggleSwitch = (index) => {
        const updatedNotifications = notifications.map((notification, i) => {
            if (i === index) {
                return { ...notification, enabled: !notification.enabled };
            }
            return notification;
        });
        setNotifications(updatedNotifications);
    };

    const handleAddNotification = (newNotification: NewNotification) => {
        setNotifications([...notifications, newNotification]);
    };

    return (
        <ScrollView style={styles.container}>
            <Header
                previousLink={"/home"}
                title={"Notifications"}
            ></Header>

            {notifications.map((notification, index) => (
                <View
                    key={index}
                    style={styles.notificationItem}
                >
                    <Text style={styles.notificationText}>{notification.name}</Text>
                    <Text>{notification.date.toLocaleString()}</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={notification.enabled ? "#f5dd4b" : "#f4f3f4"}
                        onValueChange={() => toggleSwitch(index)}
                        value={notification.enabled}
                    />
                </View>
            ))}

            {isFormVisible && (
                <NotificationForm
                    onAdd={handleAddNotification}
                    onFinish={() => setFormVisible(false)}
                />
            )}

            <TouchableOpacity
                style={styles.addButton}
                onPress={() => setFormVisible(!isFormVisible)}
            >
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    addButton: {
        bottom: 30,
        backgroundColor: "green",
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        alignSelf: "center",
        marginTop: 50,
    },
    addButtonText: {
        color: "white",
        fontSize: 30,
        fontWeight: "bold",
    },
    headerButton: {
        color: "green",
        marginRight: 10,
    },
    notificationItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#eaeaea",
    },
    notificationText: {
        fontSize: 16,
    },
});
