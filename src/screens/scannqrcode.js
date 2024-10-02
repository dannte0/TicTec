import React, { useState, useEffect } from "react";
import { Text, View, Button, StyleSheet, Alert } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

export default function QRCodeScanner({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    try {
      // Tenta fazer o parsing do QR code como JSON
      const qrData = JSON.parse(data);

      Alert.alert(
        "QR Code Lido",
        `Tipo: ${type}\nNome: ${qrData.nomeAluno}\nPeríodo: ${qrData.idPeriodo}\nMódulo: ${qrData.idModulo}\nCurso: ${qrData.idCurso}`,
        [
          { text: "OK", onPress: async () => {
              try {
                const response = await fetch("http://10.0.2.2:8000/api/atraso", {
                  method: "POST",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    nomeAluno: qrData.nomeAluno,
                    idPeriodo: qrData.idPeriodo,
                    idModulo: qrData.idModulo,
                    idCurso: qrData.idCurso,
                  }),
                });

                const json = await response.json();
                console.log("Success:", json);
                Alert.alert("Dados enviados com sucesso!");
                navigation.navigate("Home");
              } catch (error) {
                console.error("Erro ao enviar os dados:", error);
                Alert.alert("Erro ao enviar os dados.");
              }
            }
          },
          { text: "Escanear Novamente", onPress: () => setScanned(false) }
        ]
      );
    } catch (error) {
      console.error("Erro ao processar o QR Code:", error);
      Alert.alert("Erro", "QR Code inválido.");
      setScanned(false);
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
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
