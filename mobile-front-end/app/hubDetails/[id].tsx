/** @format */

import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { retrieveToken } from "../../helper/jwtToken";
import Toast from "react-native-toast-message";
import Header from "../../components/molecules/header/header";
import LineChartComponent from "../../components/molecules/LineChartComponent/LineChartComponent";

interface HubDetails {
    hub_name: string;
    hub_version: string;
}

interface SensorDetails {
    id: number;
    sensor_name: string;
    sensor_type: string;
}

const HubDetailsPage: React.FC = () => {
    const local = useLocalSearchParams();
    const hubId = Number(local.id);
    const [hubDetails, setHubDetails] = useState<HubDetails | null>(null);
    const [sensorsDetails, setSensorsDetails] = useState<SensorDetails[]>([]);

    const fetchHubDetails = async () => {
        const jwtToken = await retrieveToken();
        if (!jwtToken) {
            Toast.show({
                type: "error",
                text1: "Erreur",
                text2: "JWT token not found",
            });
            return;
        }

        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}api/hub/${hubId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            });
            if (!response.ok) {
                throw new Error("Failed to fetch hub details");
            }
            const data: HubDetails = await response.json();
            setHubDetails(data);
        } catch (error) {
            Toast.show({
                type: "error",
                text1: "Fetch error",
                text2: error.toString(),
            });
        }
    };

    const fetchSensorsDetails = async () => {
        const jwtToken = await retrieveToken();
        if (!jwtToken) {
            Toast.show({
                type: "error",
                text1: "Erreur",
                text2: "JWT token not found",
            });
            return;
        }

        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}api/sensors/hub/${hubId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            });
            if (!response.ok) {
                throw new Error("Failed to fetch sensors data");
            }
            const data: SensorDetails[] = await response.json();
            setSensorsDetails(data);
        } catch (error) {
            Toast.show({
                type: "error",
                text1: "Fetch error",
                text2: error.toString(),
            });
        }
    };

    useEffect(() => {
        fetchHubDetails();
        fetchSensorsDetails();
    }, []);

    if (!hubDetails) {
        return (
            <ActivityIndicator
                size="large"
                color="#0000ff"
            />
        );
    }
    const renderItem = ({ sensor: sensor }) => <LineChartComponent sensor={sensor} />;
    return (
        <View style={styles.container}>
            <Toast />
            <Header title={`${hubDetails.hub_name}`} />
            <View style={styles.container}>
                <Text style={styles.details}>Version: {hubDetails.hub_version}</Text>
                {sensorsDetails.map((sensor) => (
                    <Text key={sensor.id}>{`Sensor ${sensor.sensor_name}: ${sensor.sensor_type}`}</Text>
                    //     <LineChartComponent
                    //     sensor={sensor}
                    // />
                ))}
                {sensorsDetails.map((sensor) => (
                    <LineChartComponent
                        sensor={sensor}
                        key={sensor.id}
                    />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
        alignItems: "center",
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 20,
    },
    details: {
        fontSize: 18,
        marginVertical: 5,
    },
});

export default HubDetailsPage;
