export const enviarDados = async (data) => {
  try {
    // Confirma se 'data' contém todas as propriedades necessárias
    console.log(data); // Adicione isso para depuração

    const response = await fetch("http://10.0.2.2:8000/api/atraso", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nomeAluno: data.nomeAluno,
        idPeriodo: data.idPeriodo,
        idModulo: data.idModulo,
        idCurso: data.idCurso,
      }),
    });

    const json = await response.json();
    console.log("Success:", json);

    // Resetar os campos após o envio (opcional)
  } catch (error) {
    console.error("Error:", error);
  }
};

export const itensPeriodo = [
  { label: "Manhã", value: "1" },
  { label: "Tarde", value: "2" },
  { label: "Noite", value: "3" },
]
export const itensModulo = [
  { label: "1° Módulo", value: "1" },
  { label: "2° Módulo", value: "2" },
  { label: "3° Módulo", value: "3" },
]
export const itensCurso = [
  { label: "Administração", value: "1" },
  { label: "Desenvolvimento de Sistemas", value: "2" },
  { label: "Edificações", value: "3" },
  { label: "Eletrotécnica", value: "4" },
  { label: "Nutrição e Dietética", value: "5" },
]

