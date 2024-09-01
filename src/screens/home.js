import React, { useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import RNPickerSelect from "react-native-picker-select";
import moment from "moment-timezone"; // Para manipulação de data e hora

import { styles } from "../styles/body";
import { form, picker } from "../styles/form";
import {
  itensCurso,
  itensModulo,
  itensPeriodo,
  enviarDados,
} from "../api/post";

export default function Home({ navigation }) {
  const [nomeAluno, setNomeAluno] = useState("");
  const [periodo, setPeriodo] = useState(null);
  const [curso, setCurso] = useState(null);
  const [modulo, setModulo] = useState(null);

  const handleSubmit = async () => {
    // Chama a função enviar com todos os parâmetros necessários
    await enviarDados({
      nomeAluno: nomeAluno,
      idPeriodo: periodo,
      idModulo: modulo,
      idCurso: curso,
    });

    // Limpar os campos após o envio
    setNomeAluno("");
    setPeriodo(null);
    setCurso(null);
    setModulo(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={form.pickerWrapper}>
        <Text style={form.label}>Nome do Aluno:</Text>
        <TextInput
          placeholder="Digite o seu nome"
          value={nomeAluno}
          onChangeText={setNomeAluno}
          style={form.input}
        />

        <Text style={form.label}>Período:</Text>
        <RNPickerSelect
          placeholder={{ label: "Selecione um período", value: null }}
          value={periodo}
          onValueChange={setPeriodo}
          items={itensPeriodo}
          style={picker}
        />
        <Text style={form.label}>Módulo:</Text>

        <RNPickerSelect
          placeholder={{ label: "Selecione um módulo", value: null }}
          value={modulo}
          onValueChange={setModulo}
          items={itensModulo}
          style={picker}
        />
        <Text style={form.label}>Curso:</Text>

        <RNPickerSelect
          placeholder={{ label: "Selecione um curso", value: null }}
          value={curso}
          onValueChange={setCurso}
          items={itensCurso}
          style={picker}
        />

        <StatusBar style="auto" />
      </View>
      <View style={{ flexDirection: 'row'}}>

          <View style={{ flexDirection: 'column'}}>
            <TouchableOpacity
              style={form.button}
              onPress={() => navigation.navigate("Atrasos")}
            >
              <Text style={[form.label, { fontWeight: "500"}]}>
                Ir aos Atrasos
              </Text>
            </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'column', marginTop:10}}>
            <TouchableOpacity style={form.button} onPress={handleSubmit}>
              <Text style={[form.label, { fontWeight: "500",  }]}>Enviar</Text>
            </TouchableOpacity>
            </View>
      </View>
    </SafeAreaView>
  );
}
