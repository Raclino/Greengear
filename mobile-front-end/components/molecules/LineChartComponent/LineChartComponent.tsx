import React, { useEffect, useState } from 'react';
import { Text, Dimensions, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import Toast from 'react-native-toast-message';
import { retrieveToken } from '../../../helper/jwtToken';

interface SensorData {
    id: number;
    data_type: string;
    unity: string;
    data: number;
    date: string;
}
interface SensorDetails {
    id: number;
    sensor_name: string;
    sensor_type: string;
}

const LineChartComponent = ({ sensor }: { sensor: SensorDetails }) => {
    const [sensorData, setSensorData] = useState<SensorData[]>([]);

    const fetchSensorData = async () => {
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
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}api/sensors/${sensor.id}/data`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            });
            if (!response.ok) {
                throw new Error("Failed to fetch sensor data");
            }
            const data: SensorData[] = await response.json();
            setSensorData(data);
        } catch (error) {
            Toast.show({
                type: "error",
                text1: "Fetch error",
                text2: error.toString(),
            });
        }
    };

    useEffect(() => {
        fetchSensorData();
        const interval = setInterval(fetchSensorData, 5000);
        return () => clearInterval(interval);
    }, []);

    const graphTitle = sensorData.length > 0 ? `${sensor.sensor_type} en (${sensorData[0].unity})` : '';

    const validData = sensorData.filter(data => !isNaN(data.data)).map(data => ({
        ...data,
        data: Number(data.data)
    }));

    const reversedValidData = [...validData].reverse();

    const hasValidData = reversedValidData.length > 0 && reversedValidData.every(data => !isNaN(data.data));

    const chartData = hasValidData
        ? {
            labels: reversedValidData.map((data, index) =>
                index % 20 === 0
                    ? new Intl.DateTimeFormat('fr-FR', {
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit'
                    }).format(new Date(data.date))
                    : ''
            ),
            datasets: [
                {
                    data: reversedValidData.map(data => data.data),
                },
            ],
        }
        : null;

    return (
        <View>
            {chartData ? (
                <LineChart
                    data={chartData}
                    width={Dimensions.get('window').width - 16} 
                    height={220}
                    chartConfig={{
                        backgroundColor: '#F6F6F6',
                        backgroundGradientFrom: 'lightgreen', 
                        backgroundGradientTo: 'green', 
                        decimalPlaces: 2,
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        style: {
                            borderRadius: 8,
                        },
                        propsForDots: {
                            r: '4',
                            strokeWidth: '2',
                            stroke: '#424442',
                        },
                        propsForBackgroundLines: {
                            strokeDasharray: "", 
                            strokeWidth: 1,
                            stroke: "#E8E8E8", 
                        },
                    }}
                    bezier
                    style={{
                        marginVertical: 8,
                        borderRadius: 16,
                    }}
                    yAxisSuffix={sensorData.length > 0 ? sensorData[0].unity : ''}
                />) : (
                <View style={{ alignItems: 'center', justifyContent: 'center', height: 220 }}>
                    <Text>Aucune donnée valide à afficher</Text>
                </View>
            )}
        </View>
    );
};

export default LineChartComponent;
