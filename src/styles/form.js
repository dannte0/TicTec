import { StyleSheet } from "react-native";

export const form = StyleSheet.create({
  input: {
    height: 45,
    width: 300,
    marginLeft: 0,
    marginRight: 12,
    marginBottom: 12,
    marginTop: 5,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#f4f4f4",
    fontSize:14
  },
  pickerWrapper: {
    overflow: "hidden",
    paddingHorizontal: 30,
    
  },
  label:{
    fontSize:16
  },
  button: {
    backgroundColor:'#AFFFFF',
    alignItems: 'center',
    margin:30,
    padding: 10,
    borderRadius:10,
    width:100,
  },
});

export const picker = {
  inputAndroid: {
    width: 300,
    borderColor: "#000",
    borderWidth: 10,
    borderRadius: 30,
    paddingRight: 10,
    color: "black",
    backgroundColor: "#f4f4f4",
    marginLeft: 0,
    marginTop: 5,
    marginBottom: 5,
    marginRight: 5,
    fontSize:14
  },
  placeholder: {
    color: "gray",
    fontSize: 14,
  },
}
