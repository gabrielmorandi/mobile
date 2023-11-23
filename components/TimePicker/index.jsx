import React, { useState, useEffect, useRef } from "react"
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native"

const TimePicker = ({
  addAlarm,
  alarm,
  onTimeSelected,
  todosDias,
  onDiasSelecionadosChange,
}) => {
  const [selectedHour, setSelectedHour] = useState(new Date().getHours())
  const [selectedMinute, setSelectedMinute] = useState(new Date().getMinutes())
  const [diasSelecionados, setDiasSelecionados] = useState([])

  const hourScrollViewRef = useRef(null)
  const minuteScrollViewRef = useRef(null)

  const itemHeight = 80 // Altura de cada item de hora/minuto
  const scrollViewHeight = itemHeight * 3 // Altura do ScrollView para mostrar 3 itens

  useEffect(() => {
    hourScrollViewRef.current?.scrollTo({
      y: selectedHour * itemHeight,
      animated: false,
    })
    minuteScrollViewRef.current?.scrollTo({
      y: selectedMinute * itemHeight,
      animated: false,
    })
  }, [])

  useEffect(() => {
    console.log(alarm)
    onTimeSelected(selectedHour, selectedMinute)
  }, [alarm])

  const handleScroll = (event, type) => {
    const y = event.nativeEvent.contentOffset.y
    const index = Math.floor(y / itemHeight)

    if (type === "hour") {
      const newIndex = index % 24
      onTimeSelected(newIndex, selectedMinute)
    } else {
      const newIndex = index % 60
      onTimeSelected(selectedHour, newIndex)
    }
  }

  const renderTimeOptions = (count) => {
    let options = []
    for (let i = 0; i < count; i++) {
      options.push(
        <View key={i} style={styles.timeItem}>
          <Text style={styles.timeText}>{i.toString().padStart(2, "0")}</Text>
        </View>
      )
    }
    return options
  }

  const toggleDia = (dia) => {
    setDiasSelecionados((prev) => {
      const novosDiasSelecionados = prev.includes(dia)
        ? prev.filter((d) => d !== dia)
        : [...prev, dia]
      onDiasSelecionadosChange(novosDiasSelecionados) // Chama o callback
      return novosDiasSelecionados
    })
  }

  return (
    <View style={styles.containerAlarm}>
      <View style={styles.topAlarm}>
        <ScrollView
          ref={hourScrollViewRef}
          style={[styles.timeColumn, { height: scrollViewHeight }]}
          contentContainerStyle={{
            paddingTop: itemHeight,
            paddingBottom: itemHeight,
          }}
          showsVerticalScrollIndicator={false}
          snapToInterval={itemHeight}
          onMomentumScrollEnd={(e) => handleScroll(e, "hour")}
          decelerationRate="fast"
        >
          {renderTimeOptions(24)}
        </ScrollView>
        <Text style={styles.doisPontos}>:</Text>
        <ScrollView
          ref={minuteScrollViewRef}
          style={[styles.timeColumn, { height: scrollViewHeight }]}
          contentContainerStyle={{
            paddingTop: itemHeight,
            paddingBottom: itemHeight,
          }}
          showsVerticalScrollIndicator={false}
          snapToInterval={itemHeight}
          onMomentumScrollEnd={(e) => handleScroll(e, "minute")}
          decelerationRate="fast"
        >
          {renderTimeOptions(60)}
        </ScrollView>
      </View>
      <View style={styles.alarmDias}>
        <View style={styles.alarmDias}>
          {todosDias.map((diaSemana, index) => (
            <TouchableOpacity key={index} onPress={() => toggleDia(diaSemana)}>
              <View style={styles.alarmDia}>
                <Text style={styles.alarmOverline}>{diaSemana[0]}</Text>
                {diasSelecionados.includes(diaSemana) && (
                  <View style={styles.after} />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.alarmActions}>
        <View style={styles.modalButtons}>
          <TouchableOpacity onPress={() => alarm(false)}>
            <Text style={styles.buttonClose}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => addAlarm()}>
            <Text style={styles.buttonCreate}>Criar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  containerAlarm: {
    width: "100%",
    borderTopRightRadius: 28,
    borderTopLeftRadius: 28,
  },
  topAlarm: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    borderTopRightRadius: 28,
    borderTopLeftRadius: 28,
    paddingTop: 32,
    paddingBottom: 16,
    marginBottom: 16,
    backgroundColor: "#292929",
  },
  timeColumn: {
    width: 50,
  },
  timeItem: {
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  timeText: {
    fontSize: 50,
    color: "white",
  },
  doisPontos: {
    lineHeight: 50,
    fontSize: 50,
    color: "white",
  },
  modalButtons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  buttonClose: {
    color: "#959598",
    fontFamily: "nunito-regular",
    fontSize: 16,
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  buttonCreate: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    backgroundColor: "#575759",
    color: "white",
    borderRadius: 24,
    fontFamily: "nunito-medium",
    fontSize: 16,
  },
  alarmDias: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 16,
    gap: 24,
  },
  alarmDia: {
    flexDirection: "column",
  },
  alarmOverline: {
    fontSize: 24,
  },
  after: {
    backgroundColor: "#1B1D1F",
    height: 1,
    borderRadius: 100,
  },
})

export default TimePicker
