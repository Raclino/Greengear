import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

type QRCodeScannerProps = {
  onTokenScanned: (token: string) => void;
};

const QRCodeScanner: React.FC<QRCodeScannerProps> = ({ onTokenScanned }) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {

    if (type === "org.iso.QRCode") {
      setScanned(true);
      try {
        const hubInfo = JSON.parse(data);
        Alert.alert(
          "Ajouter ce Hub",
          `Voulez-vous ajouter ce Hub?\n${hubInfo.hub_name}\nVersion: ${hubInfo.hub_version}`,
          [
            {
              text: "Annuler",
              onPress: () => console.log("Ajout annulé"),
              style: "cancel"
            },
            { text: "Ajouter", onPress: () => onTokenScanned(String(hubInfo.hub_token)) }
          ]
        );
      } catch (error) {
        Alert.alert("Erreur", "Le QR code scanné n'est pas valide.");
        console.error(error);
      }
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
      )}
    </View>
  );
};

export default QRCodeScanner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});
