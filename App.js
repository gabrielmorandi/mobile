import { StatusBar } from "expo-status-bar"
import DateTimePicker from "@react-native-community/datetimepicker"
import AsyncStorage from "@react-native-async-storage/async-storage"
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Modal,
  TextInput,
} from "react-native"
import { Switch } from "react-native-paper"
import { useFonts } from "expo-font"

import { useState, useEffect } from "react"
import { styles } from "./styles"
import Header from "./components/Header"

export default function App() {
  const [fontsLoaded] = useFonts({
    "nunito-regular": require("./assets/fonts/Nunito-Regular.ttf"),
    "nunito-medium": require("./assets/fonts/Nunito-Medium.ttf"),
  })
  const [data, setData] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [groupName, setGroupName] = useState("")
  const [modalAlarmVisible, setModalAlarmVisible] = useState(false)
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

  const toggleSwitch = (itemId) => {
    const newData = data.map((item) => {
      if (item.id === itemId) {
        return { ...item, grupoAtivo: !item.grupoAtivo }
      }
      return item
    })
    setData(newData)
  }

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem("@data_key", jsonValue)
    } catch (e) {
      console.error("Erro ao salvar os dados", e)
    }
  }

  const loadData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@data_key")
      if (jsonValue != null) {
        setData(JSON.parse(jsonValue))
      }
    } catch (e) {
      console.error("Erro ao carregar os dados", e)
    }
  }

  const addGroup = () => {
    const newGroup = {
      id: Date.now(),
      nome: groupName,
      alarmes: [],
      grupoAtivo: true,
    }

    const newData = [...data, newGroup]
    setData(newData)
    storeData(newData)
    setModalVisible(false)
    setModalAlarmVisible(true)
    setGroupName("")
  }

  const [datee, setDate] = useState(new Date())
  const [mode, setMode] = useState("date")

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date
    setShow(Platform.OS === "ios")
    setDate(currentDate)
  }

  const showMode = (currentMode) => {
    setShow(true)
    setMode(currentMode)
  }

  const showDatepicker = () => {
    showMode("date")
  }

  const showTimepicker = () => {
    showMode("time")
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Header setModal={setModalVisible} />
      <View style={styles.alarms}>
        {data.map((item) => {
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible)
          setGroupName("")
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalTitle}>
              <Text style={styles.modalText}>Criar Grupo de alarmes</Text>
              <TextInput
                style={styles.input}
                value={groupName}
                onChangeText={setGroupName}
                placeholder="Nome do Grupo"
              />
            </View>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(!modalVisible)
                  setGroupName("")
                }}
              >
                <Text style={styles.buttonClose}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={addGroup}>
                <Text style={styles.buttonCreate}>Criar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalAlarmVisible}
        onRequestClose={() => {
          setModalAlarmVisible(!modalAlarmVisible)
        }}
      >
        <View style={styles.container}></View>
      </Modal>
    </View>
  )
}
