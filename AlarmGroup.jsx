import React, { useState, useEffect, useRef } from "react"
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
} from "react-native"
import { Switch } from "react-native-paper"

import TimePicker from "./components/TimePicker"
import { styles } from "./styles"

import HeaderAlarmGroup from "./components/HeaderAlarmGroup"

const AlarmGroup = ({ route, navigation }) => {
  const [group, setGroup] = useState(route.params.group)
  const { data, storeData } = route.params
  const [modalAlarmVisible, setModalAlarmVisible] = useState(false)
  const [hr, setHr] = useState()
  const [min, setMin] = useState()
  const [diasSelecionados, setDiasSelecionados] = useState([])
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [selectedAlarmId, setSelectedAlarmId] = useState(null)

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

  const handleOpenModal = () => {
    setModalAlarmVisible(true)
  }
  const addAlarm = () => {
    const newAlarm = {
      id: Date.now(),
      nome: "Novo Alarme",
      hora: `${hr.toString().padStart(2, "0")}:${min
        .toString()
        .padStart(2, "0")}`,
      ativo: true,
      dias: diasSelecionados,
    }
    const updatedGroup = {
      ...group,
      alarmes: [...group.alarmes, newAlarm],
    }
    setGroup(updatedGroup)

    // Atualizar o array data com o grupo modificado e salva no AsyncStorage
    const newData = data.map((item) =>
      item.id === group.id ? updatedGroup : item
    )
    storeData(newData)

    setModalAlarmVisible(false)
  }
  const handleTimeChange = (hour, minute) => {
    setHr(hour)
    setMin(minute)
    console.log(`Hora selecionada: ${hr}:${min}`)
  }
  const onDiasSelecionadosChange = (novosDias) => {
    setDiasSelecionados(novosDias)
  }

  const deleteAlarm = (alarmId) => {
    const updatedGroup = {
      ...group,
      alarmes: group.alarmes.filter((alarme) => alarme.id !== alarmId),
    }
    setGroup(updatedGroup)

    const newData = data.map((item) =>
      item.id === group.id ? updatedGroup : item
    )
    storeData(newData)

    setIsDeleteModalVisible(false)
  }

  const onAlarmPress = (alarmId) => {
    console.log("Abrindo modal de exclusão para o alarme:", alarmId)
    setSelectedAlarmId(alarmId)
    setIsDeleteModalVisible(true)
  }

  const onDeleteGroup = () => {
    const newData = data.filter((item) => item.id !== group.id)
    storeData(newData)
    navigation.goBack()
  }

  const deactivateAllAlarms = () => {
    const updatedGroup = {
      ...group,
      alarmes: group.alarmes.map((alarme) => ({ ...alarme, ativo: false })),
    }
    setGroup(updatedGroup)

    // Atualizar o array data com o grupo modificado e salvar no AsyncStorage
    const newData = data.map((item) =>
      item.id === group.id ? updatedGroup : item
    )
    storeData(newData)
  }

  return (
    <View style={styles.container}>
      <HeaderAlarmGroup
        groupName={group.nome}
        onPressAdd={handleOpenModal}
        onDeleteGroup={onDeleteGroup}
        onDeactivateAllAlarms={deactivateAllAlarms}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalAlarmVisible}
        onRequestClose={() => {
          setModalAlarmVisible(!modalAlarmVisible)
        }}
      >
        <View style={styles.modalAlarm}>
          <View style={styles.modaAlarmlView}>
            <TimePicker
              addAlarm={addAlarm}
              alarm={modalAlarmVisible}
              onTimeSelected={handleTimeChange}
              todosDias={todosOsDias}
              onDiasSelecionadosChange={onDiasSelecionadosChange}
            />
          </View>
        </View>
      </Modal>
      <ScrollView styles={styles.scroll}>
        <View style={styles.alarms}>
          {group.alarmes.map((alarme) => {
            return (
              <View key={alarme.id} style={styles.alarm}>
                <TouchableOpacity
                  style={styles.touchAlarm}
                  onPress={() => onAlarmPress(alarme.id)}
                >
                  <View style={styles.alarmInfo}>
                    <Text style={stylesIn.alarmTitle}>{alarme.hora}</Text>
                  </View>
                  <View style={styles.alarmDias}>
                    {todosOsDias.map((diaSemana, index) => {
                      const diaAtivo = alarme.dias.includes(diaSemana)
                      return (
                        <View key={index} style={styles.alarmDia}>
                          <Text style={styles.alarmOverline}>
                            {diaSemana[0]}
                          </Text>
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
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isDeleteModalVisible}
        onRequestClose={() => setIsDeleteModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Deseja excluir este alarme?</Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.buttonClose}
                onPress={() => setIsDeleteModalVisible(false)}
              >
                <Text style={styles.buttonClose}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonDelete}
                onPress={() => deleteAlarm(selectedAlarmId)}
              >
                <Text style={styles.buttonCreate}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const stylesIn = StyleSheet.create({
  alarmTitle: { fontSize: 24, color: "#575759" },
})

export default AlarmGroup
