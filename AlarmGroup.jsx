import React, { useState, useEffect, useRef } from "react"
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native"

import { Switch } from "react-native-paper"

import { styles } from "./styles"

import HeaderAlarmGroup from "./components/HeaderAlarmGroup"

const AlarmGroup = ({ route }) => {
  const [group, setGroup] = useState(route.params.group)
  const { data, storeData } = route.params
  const todosOsDias = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ]

  const toggleAlarmeAtivo = (alarmeId) => {
    const novoGrupo = { ...group }
    novoGrupo.alarmes = novoGrupo.alarmes.map((alarme) => {
      if (alarme.id === alarmeId) {
        return { ...alarme, ativo: !alarme.ativo }
      }
      return alarme
    })

    setGroup(novoGrupo)

    // Atualiza o array data com o grupo modificado e salva no AsyncStorage
    const newData = data.map((item) =>
      item.id === novoGrupo.id ? novoGrupo : item
    )
    storeData(newData)
  }
  console.log(group)

  return (
    <View style={styles.container}>
      <HeaderAlarmGroup groupName={group.nome} />
      {group.alarmes.map((alarme) => {
        return (
          <View key={alarme.id} style={styles.alarm}>
            <TouchableOpacity
              style={styles.touchAlarm}
              // Adicione aqui qualquer ação que você queira que ocorra ao tocar no alarme
            >
              <View style={styles.alarmInfo}>
                <Text style={stylesIn.alarmTitle}>{alarme.hora}</Text>
                {/* Aqui você pode adicionar outros detalhes do alarme se necessário */}
              </View>
              <View style={styles.alarmDias}>
                {todosOsDias.map((diaSemana, index) => {
                  const diaAtivo = alarme.dias.includes(diaSemana)
                  return (
                    <View key={index} style={styles.alarmDia}>
                      <Text style={styles.alarmOverline}>{diaSemana[0]}</Text>
                      {diaAtivo && <View style={styles.after} />}
                    </View>
                  )
                })}
              </View>
            </TouchableOpacity>
            <TouchableWithoutFeedback
              onPress={() => toggleAlarmeAtivo(alarme.id)}
            >
              <View style={styles.switchView}>
                <Switch
                  value={alarme.ativo}
                  onValueChange={() => toggleAlarmeAtivo(alarme.id)}
                  style={styles.switch}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        )
      })}
    </View>
  )
}

const stylesIn = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEEEF0",
    paddingHorizontal: 16,
    gap: 32,
    paddingTop: 64,
  },
  alarmTitle: { fontSize: 24, color: "#575759" },
})

export default AlarmGroup
