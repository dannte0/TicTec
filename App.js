//Biblioteca
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

//Meus imports
import Home from "./src/screens/home";
import { header } from "./src/styles/body";
import Atrasos from "./src/screens/visualizarAtraso";
import QRCodeScanner from "./src/screens/scannqrcode";
import SplashScreen from "./src/screens/splash";

export default function App() {
  const [nomeAluno, setNomeAluno] = useState("");
  const [periodo, setPeriodo] = useState(null);
  const [curso, setCurso] = useState(null);
  const [modulo, setModulo] = useState(null);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Home" component={Home} options={{headerShown:false}} />
        <Stack.Screen name="Atrasos" component={Atrasos} options={header} />
        <Stack.Screen name="QRCodeScanner" component={QRCodeScanner} options={header}/>
        <Stack.Screen name="Splash" component={SplashScreen} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
