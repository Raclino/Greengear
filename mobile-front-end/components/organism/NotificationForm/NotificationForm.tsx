/** @format */

import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { NewNotification, NotificationFormProps } from "./NotificationForm.model";
import { registerForPushNotificationsAsync } from "../../../helper/permissions";
import * as Notifications from "expo-notifications";

const NotificationForm: React.FC<NotificationFormProps> = ({ onAdd, onFinish }) => {
    const [newNotification, setNewNotification] = useState<NewNotification>({
        name: "",
        date: new Date(),
        enabled: true,
    });

    // useEffect(() => {
    //     registerForPushNotificationsAsync();
    // }, []);

    // const scheduleNotification = async () => {
    //     await Notifications.scheduleNotificationAsync({
    //         content: {
    //             title: "Notification",
    //             body: newNotification.name,
    //         },
    //         trigger: newNotification.date,
    //     });
    // };
    const onChange = (event: any, selectedDate?: Date) => {
        selectedDate && setNewNotification({ ...newNotification, date: selectedDate });
    };

    const showDatePicker = () => {
        DateTimePickerAndroid.open({
            value: newNotification.date,
            onChange,
            mode: "date",
            is24Hour: true,
        });
    };

    const showTimePicker = () => {
        DateTimePickerAndroid.open({
            value: newNotification.date,
            onChange,
            mode: "time",
            is24Hour: true,
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={(text) => setNewNotification({ ...newNotification, name: text })}
                value={newNotification.name}
                placeholder="Notification Name"
            />
            <TouchableOpacity
                style={styles.button}
                onPress={showDatePicker}
            >
                <Text style={styles.buttonText}>Pick Date</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={showTimePicker}
            >
                <Text style={styles.buttonText}>Pick Time</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={async () => {
                    // await scheduleNotification();
                    onAdd(newNotification);
                    setNewNotification({ name: "", date: new Date(), enabled: true });
                    onFinish();
                }}
            >
                <Text style={styles.buttonText}>Add Notification</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    input: {
        height: 40,
        marginVertical: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
    },
    button: {
        backgroundColor: "#007AFF",
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
        alignItems: "center",
    },
    buttonText: {
        color: "white",
    },
});

export default NotificationForm;
