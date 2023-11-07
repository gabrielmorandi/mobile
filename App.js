import { StatusBar } from "expo-status-bar"
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native"
import { Switch } from "react-native-paper"
import { useFonts } from "expo-font"

import Svg, { Path } from "react-native-svg"
import { useState } from "react"

export default function App() {
  const [fontsLoaded] = useFonts({
    "nunito-regular": require("./assets/fonts/Nunito-Regular.ttf"),
    "nunito-medium": require("./assets/fonts/Nunito-Medium.ttf"),
  })

  const todosOsDias = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ]

  const converterHoraParaMinutos = (hora) => {
    const [horas, minutos] = hora.split(":").map(Number)
    return horas * 60 + minutos
  }

  const converterMinutosParaHora = (minutos) => {
    const horas = Math.floor(minutos / 60)
    const mins = minutos % 60
    return `${horas.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}`
  }

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
  ])

  const toggleSwitch = (itemId) => {
    const newData = data.map((item) => {
      if (item.id === itemId) {
        return { ...item, grupoAtivo: !item.grupoAtivo }
      }
      return item
    })
    setData(newData)
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.mainHeader}>
        <Text style={styles.bom}>Bom dia ⛅</Text>
        <View style={styles.mainHeaderContent}>
          <Text style={styles.h6}>⏰ Grupos de Alarmes</Text>
          <View style={styles.svgs}>
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
              <Path
                d="M12 4C7.12103 4 3.00003 8.121 3.00003 13C3.00003 17.879 7.12103 22 12 22C16.879 22 21 17.879 21 13C21 8.121 16.879 4 12 4ZM16 14H13V17H11V14H8.00003V12H11V9H13V12H16V14ZM17.284 3.707L18.696 2.291L21.706 5.291L20.293 6.708L17.284 3.707ZM5.28203 2.294L6.70003 3.706L3.71003 6.706L2.29303 5.293L5.28203 2.294Z"
                fill="#1B1D1F"
              />
            </Svg>
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <Path
                d="M17.284 3.707L18.696 2.291L21.706 5.291L20.293 6.708L17.284 3.707ZM6.69798 3.707L3.70798 6.706L2.28998 5.294L5.27998 2.294L6.69798 3.707ZM12 4C7.12198 4 2.99998 8.121 2.99998 13C2.99998 17.879 7.12198 22 12 22C16.879 22 21 17.879 21 13C21 8.121 16.879 4 12 4ZM16 17H8.13098L12.131 11H7.99998V9H15.868L14.833 10.554L14.832 10.555L11.869 15H16V17Z"
                fill="#1B1D1F"
              />
            </Svg>
          </View>
        </View>
      </View>
      <View style={styles.alarms}>
        {data.map((item) => {
          // Filtrar os alarmes ativos e converter as horas para minutos
          const alarmesAtivosMinutos = item.alarmes
            .filter((alarme) => alarme.ativo)
            .map((alarme) => converterHoraParaMinutos(alarme.hora))

          const menorHora = Math.min(...alarmesAtivosMinutos)
          const maiorHora = Math.max(...alarmesAtivosMinutos)

          const horarioInicio = converterMinutosParaHora(menorHora)
          const horarioFim = converterMinutosParaHora(maiorHora)

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
                    )
                    return (
                      <View key={index} style={styles.alarmDia}>
                        <Text style={styles.alarmOverline}>{diaSemana[0]}</Text>
                        {diaAtivo && <View style={styles.after} />}
                      </View>
                    )
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
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEEEF0",
    paddingHorizontal: 16,
    gap: 32,
    paddingTop: 64,
  },
  mainHeader: {
    gap: 16,
  },
  mainHeaderContent: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  svgs: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  h6: {
    fontFamily: "nunito-medium",
    fontSize: 20,
    lineHeight: 32,
    letterSpacing: 0.03,
  },
  bom: {
    width: "100%",
    fontFamily: "nunito-regular",
    fontSize: 48,
    lineHeight: 56,
  },
  alarms: {
    gap: 32,
  },
  alarm: {
    backgroundColor: "#FEFEFF",
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  touchAlarm: {
    padding: 16,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  alarmTitle: {
    fontFamily: "nunito-medium",
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.014,
  },
  overline: {
    fontFamily: "nunito-regular",
    fontSize: 10,
    lineHeight: 20,
  },
  alarmOverline: {
    fontFamily: "nunito-regular",
    fontSize: 10,
    lineHeight: 20,
  },
  caption: {
    fontFamily: "nunito-regular",
    fontSize: 12,
    lineHeight: 20,
    letterSpacing: 0.048,
  },
  alarmDias: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
  },
  alarmDia: {
    flexDirection: "column",
  },
  after: {
    backgroundColor: "#1B1D1F",
    height: 1,
    borderRadius: 100,
  },
  switchView: {
    padding: 10,
    paddingVertical: 23,
  },
  switch: {
    alignSelf: "center",
    justifyContent: "center",
  },
})
