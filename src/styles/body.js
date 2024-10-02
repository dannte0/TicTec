import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    padding:20,
    justifyContent: "center",
  },

  qrButton: {
    backgroundColor: '#000', // Cor do botão QR Code
    borderRadius: 5,
    padding: 15,
    alignItems: 'center', // Centraliza o ícone
    justifyContent: 'center', // Centraliza verticalmente
    marginTop: 20, // Espaço acima do botão
  },
  backgroundImage:{
    flex:1,
    resizeMode:'cover',
    alignItems: "center",
    justifyContent:'center'
  }

});

export const header = {
  headerStyle:{
    height:70,
    backgroundColor: '#000',
  },
  headerTitleStyle: {
    color: '#fff', // Altere para a cor desejada
    fontSize: 20, // Ajuste o tamanho da fonte se necessário
  },
  headerTintColor: '#fff', // Cor da seta de voltar e outros ícones
}
export const headerSplsh = {
  headerStyle:{
    height:70,
    backgroundColor: '#000',
  },
  headerTitleStyle: {
    color: '#fff', // Altere para a cor desejada
    fontSize: 20, // Ajuste o tamanho da fonte se necessário
  },
  headerTintColor: '#fff', // Cor da seta de voltar e outros ícones
}