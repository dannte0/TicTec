import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { styles } from "../styles/body"; // Verifique o caminho correto
import { form, picker } from "../styles/form"; // Verifique o caminho correto

export default function Home({ navigation }) {
  const [nomeAluno, setNomeAluno] = useState("");
  const [periodo, setPeriodo] = useState(null);
  const [modulo, setModulo] = useState(null);
  const [curso, setCurso] = useState(null);
  const [periodos, setPeriodos] = useState([]);
  const [modulos, setModulos] = useState([]);
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const periodosData = await fetchPeriodos();
        const modulosData = await fetchModulos();
        const cursosData = await fetchCursos();

        setPeriodos(periodosData);
        setModulos(modulosData);
        setCursos(cursosData);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    loadData();
  }, []);

  const enviarDados = async () => {
    // Verifica se todos os campos estão preenchidos
    if (!nomeAluno || !periodo || !modulo || !curso) {
      console.error("Todos os campos devem ser preenchidos.");
      return; // Não enviar a requisição
    }

    try {
      const response = await fetch("http://10.0.2.2:8000/api/atraso", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nomeAluno,
          idPeriodo: periodo,
          idModulo: modulo,
          idCurso: curso,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Erro ao enviar os dados:", errorText);
        throw new Error("Erro ao enviar os dados");
      }

      const json = await response.json();
      console.log("Success:", json);

      // Resetar os campos após o envio
      setNomeAluno("");
      setPeriodo(null);
      setModulo(null);
      setCurso(null);
    } catch (error) {
      console.error("Error:", error);
    }
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
          onValueChange={(value) => {
            console.log("Periodo selecionado:", value);
            setPeriodo(value);
          }}
          items={periodos}
          style={picker}
        />

        <Text style={form.label}>Módulo:</Text>
        <RNPickerSelect
          placeholder={{ label: "Selecione um módulo", value: null }}
          value={modulo}
          onValueChange={(value) => {
            console.log("Modulo selecionado:", value);
            setModulo(value);
          }}
          items={modulos}
          style={picker}
        />

        <Text style={form.label}>Curso:</Text>
        <RNPickerSelect
          placeholder={{ label: "Selecione um curso", value: null }}
          value={curso}
          onValueChange={(value) => {
            console.log("Curso selecionado:", value);
            setCurso(value);
          }}
          items={cursos}
          style={picker}
        />

        <StatusBar style="auto" />
      </View>

      <View style={{ flexDirection: 'row' }}>
        <View style={{ flexDirection: 'column' }}>
          <TouchableOpacity
            style={form.button}
            onPress={() => navigation.navigate("Atrasos")}
          >
            <Text style={[form.label, { fontWeight: "500" }]}>
              Ir aos Atrasos
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'column', marginTop: 10 }}>
          <TouchableOpacity style={form.button} onPress={enviarDados}>
            <Text style={[form.label, { fontWeight: "500" }]}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ flexDirection: 'column' }}>
          <TouchableOpacity
            style={form.button}
            onPress={() => navigation.navigate("QRCodeScanner")}
          >
            <Text style={[form.label, { fontWeight: "500" }]}>
              Escanear QR Code
            </Text>
          </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
}

// Funções para buscar dados da API
const fetchPeriodos = async () => {
  const response = await fetch("http://10.0.2.2:8000/api/periodo");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data.map(item => ({ label: item.periodo, value: item.idPeriodo }));
};

const fetchModulos = async () => {
  const response = await fetch("http://10.0.2.2:8000/api/modulo");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data.map(item => ({ label: item.modulo, value: item.idModulo }));
};

const fetchCursos = async () => {
  const response = await fetch("http://10.0.2.2:8000/api/curso");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data.map(item => ({ label: item.curso, value: item.idCurso }));
};
