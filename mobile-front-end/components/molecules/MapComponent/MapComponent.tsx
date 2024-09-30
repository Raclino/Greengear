import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapComponent = () => {
  const [pointsOfInterest, setPointsOfInterest] = useState([
    // Ajoutez ici vos données statiques
    {
      id: 1,
      latitude: 30.78825,
      longitude: -120.4324,
      title: "Point d'intérêt 1",
      description: "Description du point d'intérêt 1",
    },
    {
      id: 2,
      latitude: 37.78825,
      longitude: -122.4324,
      title: "Point d'intérêt 2",
      description: "Description du point d'intérêt 2",
    },
    // Ajoutez d'autres points d'intérêt selon le même modèle
  ]);

  // Données statiques le temps de l'implémenté
  /*
  useEffect(() => {
    const fetchPointsOfInterest = async () => {
      try {
        const response = await fetch('URL_DE_VOTRE_API');
        const data = await response.json();
        setPointsOfInterest(data.pointsOfInterest);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPointsOfInterest();
  }, []);
  */

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {pointsOfInterest.map((point) => (
          <Marker
            key={point.id}
            coordinate={{ latitude: point.latitude, longitude: point.longitude }}
            title={point.title}
            description={point.description}
          />
        ))}
      </MapView>
    </View>
  );
};

export default MapComponent;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
