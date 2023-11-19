import React, { useState, useEffect, useRef } from "react"
import { View, ScrollView, Text, StyleSheet } from "react-native"

const TimePicker = ({ onTimeSelected }) => {
  const [selectedHour, setSelectedHour] = useState(12)
  const [selectedMinute, setSelectedMinute] = useState(30)

  const hourScrollViewRef = useRef(null)
  const minuteScrollViewRef = useRef(null)

  const itemHeight = 40 // Altura de cada item de hora/minuto
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

  const handleScroll = (event, type) => {
    const y = event.nativeEvent.contentOffset.y
    const index = Math.floor(y / itemHeight)
    if (type === "hour") {
      setSelectedHour(index)
      onTimeSelected(index, selectedMinute)
    } else {
      setSelectedMinute(index)
      onTimeSelected(selectedHour, index)
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

  return (
    <View style={styles.container}>
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
        decelerationRate="fast" // Ajuste a taxa de desaceleração aqui
      >
        {renderTimeOptions(24)}
      </ScrollView>
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
        decelerationRate="fast" // Ajuste a taxa de desaceleração aqui
      >
        {renderTimeOptions(60)}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  timeColumn: {
    width: 50,
  },
  timeItem: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  timeText: {
    fontSize: 18,
  },
})

export default TimePicker
