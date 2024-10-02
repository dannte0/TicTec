import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Alert,
  ImageBackground,
  ScrollView
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { styles } from "../styles/body";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { form, picker } from "../styles/form"; 
import { urlAtrasoEmulador, urlAtrasoNgrok, urlCursoEmulador, urlCursoNgrok, urlModuloEmulador, urlModuloNgrok, urlPeriodoEmulador, urlPeriodoNgrok } from "../urls/api";
import backgroundImage from '../img/pontetecback.gif'

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
      Alert.alert("Todos os campos devem ser prenchidos");
      console.error("Todos os campos devem ser preenchidos.");
      return; // Não enviar a requisição
    }

    try {
      const response = await fetch(urlAtrasoNgrok, {
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

      Alert.alert('Atraso cadastrado com sucesso!');
    } catch (error) {
      Alert.alert('Não foi possível cadastrar o atraso');
      console.error("Error:", error);
    }
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
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
        <View style={{ flexDirection: 'column' , marginTop:9}}>
          <TouchableOpacity
            style={form.button}
            onPress={() => navigation.navigate("Atrasos")}
          >
            <Text style={[form.labelButton, { fontWeight: "500"}]}>
              Atrasos
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'column', marginTop: 10 }}>
          <TouchableOpacity style={form.button} onPress={enviarDados}>
            <Text style={[form.labelButton, { fontWeight: "500" }]}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ flexDirection: 'column' }}>
      <TouchableOpacity style={styles.qrButton} onPress={() => navigation.navigate("QRCodeScanner")}>
            <Icon name="qr-code" size={35} color="white" />
          </TouchableOpacity>
        </View>
    </ImageBackground>

  );
}

// Funções para buscar dados da API
const fetchPeriodos = async () => {
  const response = await fetch(urlPeriodoNgrok);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data.map(item => ({ label: item.periodo, value: item.idPeriodo }));
};

const fetchModulos = async () => {
  const response = await fetch(urlModuloNgrok);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data.map(item => ({ label: item.modulo, value: item.idModulo }));
};

const fetchCursos = async () => {
  const response = await fetch(urlCursoNgrok);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data.map(item => ({ label: item.curso, value: item.idCurso }));
};
