import React, { useState, useEffect, useRef } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
} from "react-native";
import { Switch } from "react-native-paper";
import Svg, { Path } from "react-native-svg";
import TimePicker from "./components/TimePicker";
import { styles } from "./styles";
import HeaderAlarmGroup from "./components/HeaderAlarmGroup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import schedulePushNotifications from "./utils/ExpoNotifications/schedulePushNotifications";
import cancelNotification from "./utils/ExpoNotifications/cancelNotification";

const AlarmGroup = ({ route, navigation }) => {
  const storeData = async (newData) => {
    try {
      await AsyncStorage.setItem("@myApp:data", JSON.stringify(newData));
    } catch (error) {
      console.error("Error storing data:", error);
    }
  };
  const [data, setData] = useState([]);

  const [group, setGroup] = useState(route.params.group);
  const [modalAlarmVisible, setModalAlarmVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [hr, setHr] = useState();
  const [min, setMin] = useState();
  const [diasSelecionados, setDiasSelecionados] = useState([]);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [selectedAlarmId, setSelectedAlarmId] = useState(null);
  const [alertModalVisible, setAlertModalVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [isSwitchOn, setIsSwitchOn] = useState(true);

  const openAlertModal = (title, message) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setAlertModalVisible(true);
  };

  const closeAlertModal = () => {
    setAlertModalVisible(false);
  };

  const closeModal = () => {
    setModalVisible(false);
    onClose();
  };
  const todosOsDias = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ];

  const toggleAlarmeAtivo = async (alarmeId) => {
    const novoGrupo = { ...group };
    novoGrupo.alarmes = novoGrupo.alarmes.map((alarme) => {
      if (alarme.id === alarmeId) {
        return { ...alarme, ativo: !alarme.ativo };
      }
      return alarme;
    });

    setGroup(novoGrupo);

    const newData = data.map((item) =>
      item.id === novoGrupo.id ? novoGrupo : item
    );
    storeData(newData);

    const updatedAlarme = novoGrupo.alarmes.find(
      (alarme) => alarme.id === alarmeId
    );

    if (updatedAlarme) {
      if (updatedAlarme.ativo) {
        const notifications = await schedulePushNotifications(updatedAlarme);
        updatedAlarme.notificationId = notifications;
      } else {
        if (Array.isArray(updatedAlarme.notificationId)) {
          updatedAlarme.notificationId.forEach(async (notificationId) => {
            await cancelNotification(notificationId);
          });
        } else {
          await cancelNotification(updatedAlarme.notificationId);
        }
      }
    }
  };

  const handleOpenModal = () => {
    setModalAlarmVisible(true);
  };
  const addAlarm = async () => {
    const getNomeDiaSemanaAtual = () => {
      const hoje = new Date();
      const nomeDia = todosOsDias[hoje.getDay()];
      return nomeDia;
    };

    const dias =
      diasSelecionados.length > 0
        ? diasSelecionados
        : [getNomeDiaSemanaAtual()];

    const now = new Date();
    const newAlarm = {
      id: Date.now(),
      notificationId: [],
      nome: `nome: ${Date.now()}, ${group.nome}`,
      hora: `${
        hr?.toString().padStart(2, "0") ||
        now.getHours().toString().padStart(2, "0")
      }:${
        min?.toString().padStart(2, "0") ||
        now.getMinutes().toString().padStart(2, "0")
      }`,
      ativo: true,
      dias: dias,
      grupo: `${group.nome}`,
    };

    const updatedGroup = {
      ...group,
      alarmes: [...group.alarmes, newAlarm],
    };
    setGroup(updatedGroup);

    // Atualizar o array data com o grupo modificado e salva no AsyncStorage
    const newData = data.map((item) =>
      item.id === group.id ? updatedGroup : item
    );
    storeData(newData);

    setModalAlarmVisible(false);

    const notificationId = await schedulePushNotifications(newAlarm);

    newAlarm.notificationId.push(notificationId);

    openAlertModal(
      `Grupo ${group.nome}`,
      `O alarme para o horário ${newAlarm.hora} e dia(s) ${newAlarm.dias} foi criado com sucesso!`,
      () => {}
    );
  };

  const handleTimeChange = (hour, minute) => {
    setHr(hour);
    setMin(minute);
    console.log(`Hora selecionada: ${hr}:${min}`);
  };
  const onDiasSelecionadosChange = (novosDias) => {
    setDiasSelecionados(novosDias);
  };

  const deleteAlarm = async (alarmId) => {
    const updatedGroup = {
      ...group,
      alarmes: group.alarmes.filter((alarme) => alarme.id !== alarmId),
    };
    setGroup(updatedGroup);

    const newData = data.map((item) =>
      item.id === group.id ? updatedGroup : item
    );
    storeData(newData);

    const deletedAlarm = group.alarmes.find((alarme) => alarme.id === alarmId);
    if (deletedAlarm && deletedAlarm.notificationId) {
      if (Array.isArray(deletedAlarm.notificationId)) {
        deletedAlarm.notificationId.forEach(async (notificationId) => {
          await cancelNotification(notificationId);
        });
      } else {
        await cancelNotification(deletedAlarm.notificationId);
      }
    }

    setIsDeleteModalVisible(false);
  };

  const onAlarmPress = (alarmId) => {
    console.log("Abrindo modal de exclusão para o alarme:", alarmId);
    setSelectedAlarmId(alarmId);
    setIsDeleteModalVisible(true);
  };

  const onDeleteGroup = async () => {
    group.alarmes.forEach(async (alarme) => {
      if (alarme.notificationId) {
        if (Array.isArray(alarme.notificationId)) {
          alarme.notificationId.forEach(async (notificationId) => {
            await cancelNotification(notificationId);
          });
        } else {
          await cancelNotification(alarme.notificationId);
        }
      }
    });

    const newData = data.filter((item) => item.id !== group.id);
    storeData(newData);
    navigation.goBack();
  };

  const desactivateAllAlarms = async () => {
    const updatedGroup = {
      ...group,
      alarmes: group.alarmes.map((alarme) => ({
        ...alarme,
        ativo: !alarme.ativo, // Inverte o estado de ativação
      })),
    };
    setGroup(updatedGroup);

    // Itera sobre os alarmes do grupo atualizado
    for (const alarme of updatedGroup.alarmes) {
      if (alarme.notificationId) {
        if (Array.isArray(alarme.notificationId)) {
          // Se há vários IDs de notificação, cancela cada um
          for (const notificationId of alarme.notificationId) {
            await cancelNotification(notificationId);
          }
        } else {
          // Se há apenas um ID de notificação, cancela ele
          await cancelNotification(alarme.notificationId);
        }
      }

      // Se o alarme está ativo, reagenda a notificação
      if (alarme.ativo) {
        const notifications = await schedulePushNotifications(alarme);
        alarme.notificationId = notifications;
      }
    }

    // Atualiza o array data com o grupo modificado e salva no AsyncStorage
    const newData = data.map((item) =>
      item.id === group.id ? updatedGroup : item
    );
    storeData(newData);
  };

  return (
    <View style={styles.container}>
      <HeaderAlarmGroup
        groupName={group.nome}
        onPressAdd={handleOpenModal}
        onDeleteGroup={onDeleteGroup}
        onDeactivateAllAlarms={desactivateAllAlarms}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalAlarmVisible}
        onRequestClose={() => {
          setModalAlarmVisible(!modalAlarmVisible);
        }}
      >
        <View style={styles.modalAlarm}>
          <View style={styles.modaAlarmlView}>
            <TimePicker
              addAlarm={addAlarm}
              alarm={modalVisible}
              onTimeSelected={handleTimeChange}
              todosDias={todosOsDias}
              onDiasSelecionadosChange={onDiasSelecionadosChange}
            />
          </View>
        </View>
      </Modal>
      <ScrollView style={styles.scroll}>
        <View style={styles.alarms}>
          {group.alarmes.length === 0 ? (
            <View style={styles.containerTextAlarm}>
              <Text style={styles.noAlarmsTitle}>Nenhum alarme criado</Text>
              <TouchableOpacity
                onPress={handleOpenModal}
                style={styles.noAlarmsTouch}
              >
                <Text style={styles.noAlarmsText}>
                  Clique no ícone para criar um
                </Text>
                <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                  <Path
                    d="M12 4C7.12103 4 3.00003 8.121 3.00003 13C3.00003 17.879 7.12103 22 12 22C16.879 22 21 17.879 21 13C21 8.121 16.879 4 12 4ZM16 14H13V17H11V14H8.00003V12H11V9H13V12H16V14ZM17.284 3.707L18.696 2.291L21.706 5.291L20.293 6.708L17.284 3.707ZM5.28203 2.294L6.70003 3.706L3.71003 6.706L2.29303 5.293L5.28203 2.294Z"
                    fill="#1B1D1F"
                  />
                </Svg>
              </TouchableOpacity>
            </View>
          ) : (
            group.alarmes.map((alarme) => (
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
                      const diaAtivo = alarme.dias.includes(diaSemana);
                      return (
                        <View key={index} style={styles.alarmDia}>
                          <Text style={styles.alarmOverline}>
                            {diaSemana[0]}
                          </Text>
                          {diaAtivo && <View style={styles.after} />}
                        </View>
                      );
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
            ))
          )}
        </View>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={alertModalVisible}
        onRequestClose={closeAlertModal}
      >
        <View style={styles.centeredViewAlert}>
          <View style={styles.modalViewAlert}>
            <Text style={styles.modalTitleAlert}>{alertTitle}</Text>
            <Text style={styles.modalTextAlert}>{alertMessage}</Text>
            <TouchableOpacity
              style={styles.buttonCloseAlert}
              onPress={closeAlertModal}
            >
              <Text style={styles.buttonCloseAlertText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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

          <Modal
            animationType="slide"
            transparent={true}
            visible={isDeleteModalVisible}
            onRequestClose={() => setIsDeleteModalVisible(false)}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>
                  Deseja excluir este alarme?
                </Text>

                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={styles.buttonClose}
                    onPress={() => setIsDeleteModalVisible(false)}
                  >
                    <Text style={styles.buttonClose}>Cancelar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.buttonDelete}
                    onPress={() => {
                      deleteAlarm(selectedAlarmId);
                      openAlertModal(
                        "Alarme Excluído",
                        "O alarme foi excluído com sucesso!"
                      );
                    }}
                  >
                    <Text style={styles.buttonCreate}>Excluir</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </Modal>
    </View>
  );
};

const stylesIn = StyleSheet.create({
  alarmTitle: { fontSize: 24, color: "#575759" },
});

export default AlarmGroup;
