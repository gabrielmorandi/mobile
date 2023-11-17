import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Switch } from "react-native-paper";
import { useFonts } from "expo-font";

import Svg, { Path } from "react-native-svg";
import { useState, useEffect } from "react";
import { styles } from "./styles";
import Header from "./Header.js";

export default function App() {
  const [fontsLoaded] = useFonts({
    "nunito-regular": require("./assets/fonts/Nunito-Regular.ttf"),
    "nunito-medium": require("./assets/fonts/Nunito-Medium.ttf"),
  });

  const todosOsDias = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ];

  const converterHoraParaMinutos = (hora) => {
    const [horas, minutos] = hora.split(":").map(Number);
    return horas * 60 + minutos;
  };

  const converterMinutosParaHora = (minutos) => {
    const horas = Math.floor(minutos / 60);
    const mins = minutos % 60;
    return `${horas.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}`;
  };

  const [data, setData] = useState([
    {
      id: 1,
      nome: "🏫 Escola",
      alarmes: [
        {
          id: 1,
          nome: "alarme1",
          hora: "06:30",
          ativo: true,
          dias: ["Segunda", "Terça", "Quarta"],
        },
        {
          id: 2,
          nome: "alarme2",
          hora: "07:00",
          ativo: true,
          dias: ["Segunda", "Terça", "Quarta"],
        },
      ],
      grupoAtivo: true,
    },
    {
      id: 2,
      nome: "💊 Remédios",
      alarmes: [
        {
          id: 1,
          nome: "Dipirona",
          hora: "08:00",
          ativo: true,
          dias: [
            "Domingo",
            "Segunda",
            "Terça",
            "Quarta",
            "Quinta",
            "Sexta",
            "Sábado",
          ],
        },
        {
          id: 2,
          nome: "azulzin",
          hora: "22:00",
          ativo: false,
          dias: ["Sexta", "Sábado", "Domingo"],
        },
        {
          id: 3,
          nome: "doril",
          hora: "18:00",
          ativo: true,
          dias: ["Sexta", "Segunda"],
        },
      ],
      grupoAtivo: true,
    },
  ]);

  const toggleSwitch = (itemId) => {
    const newData = data.map((item) => {
      if (item.id === itemId) {
        return { ...item, grupoAtivo: !item.grupoAtivo };
      }
      return item;
    });
    setData(newData);
  };

  const [greeting, setGreeting] = useState("");

  const updateGreeting = () => {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
      setGreeting("Bom dia ⛅");
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting("Boa tarde ☀️");
    } else {
      setGreeting("Boa noite 🌙");
    }
  };

  useEffect(() => {
    updateGreeting();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Header greeting={greeting}></Header>
      <View style={styles.alarms}>
        {data.map((item) => {
          // Filtrar os alarmes ativos e converter as horas para minutos
          const alarmesAtivosMinutos = item.alarmes
            .filter((alarme) => alarme.ativo)
            .map((alarme) => converterHoraParaMinutos(alarme.hora));

          const menorHora = Math.min(...alarmesAtivosMinutos);
          const maiorHora = Math.max(...alarmesAtivosMinutos);

          const horarioInicio = converterMinutosParaHora(menorHora);
          const horarioFim = converterMinutosParaHora(maiorHora);

          return (
            <View key={item.id} style={styles.alarm}>
              <TouchableOpacity style={styles.touchAlarm}>
                <View style={styles.alarmInfo}>
                  <Text style={styles.alarmTitle}>{item.nome}</Text>
                  <Text style={styles.overline}>
                    {item.alarmes.filter((alarme) => alarme.ativo).length}{" "}
                    Alarmes ativos de {item.alarmes.length}
                  </Text>
                  <Text
                    style={styles.caption}
                  >{`${horarioInicio} - ${horarioFim}`}</Text>
                </View>
                <View style={styles.alarmDias}>
                  {todosOsDias.map((diaSemana, index) => {
                    const diaAtivo = item.alarmes.some(
                      (alarme) =>
                        alarme.ativo && alarme.dias.includes(diaSemana)
                    );
                    return (
                      <View key={index} style={styles.alarmDia}>
                        <Text style={styles.alarmOverline}>{diaSemana[0]}</Text>
                        {diaAtivo && <View style={styles.after} />}
                      </View>
                    );
                  })}
                </View>
              </TouchableOpacity>
              <TouchableWithoutFeedback onPress={() => toggleSwitch(item.id)}>
                <View style={styles.switchView}>
                  <Switch
                    value={item.grupoAtivo}
                    onValueChange={() => toggleSwitch(item.id)}
                    style={styles.switch}
                  />
                </View>
              </TouchableWithoutFeedback>
            </View>
          );
        })}
      </View>
    </View>
  );
}
