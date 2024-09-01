import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  FlatList,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { styles } from "../styles/body";
import { form } from "../styles/form";
import { SafeAreaView } from "react-native-safe-area-context";
// import { getAtrasos } from "../api/get";

export default function Atrasos({ navigation }) {
  const [data, setData] = useState([]);
  const getAtrasos = async () => {
    try {
      const response = await fetch("http://10.0.2.2:8000/api/atraso");
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAtrasos();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
        <FlatList
        data={data}
        keyExtractor={({ idAtraso }, index) => idAtraso}
        renderItem={({ item }) => (
        <View style={{backgroundColor:'#ccc', borderColor:'#000', borderWidth:1, borderRadius:10, margin:20, padding:10}}>
          <Text>
            Módulo: {item.nomeModulo}
            {"\n"}
            Período: {item.nomePeriodo}
            {"\n"}
            Curso: {item.nomeCurso}
            {"\n"}
            {"\n"}
            {"\n"}
            Data do atraso: {item.dataAtraso}
            {"\n"}
            Horário do atraso: {item.horarioAtraso}
            {"\n"}
          </Text>
          </View>
        )}
      />

      <TouchableOpacity
        style={form.button}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={[form.label, { fontWeight: "500" }]}>Voltar a home</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
