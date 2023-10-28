import { StatusBar } from "expo-status-bar"
import { StyleSheet, Switch, Text, View } from "react-native"
import { useFonts } from "expo-font"

import Svg, { Path } from "react-native-svg"

export default function App() {
  const [fontsLoaded] = useFonts({
    "nunito-regular": require("./assets/fonts/Nunito-Regular.ttf"),
    "nunito-medium": require("./assets/fonts/Nunito-Medium.ttf"),
  })

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
        <View style={styles.alarm}>
          <View style={styles.alarmInfo}>
            <Text style={styles.alarmTitle}>🏫 Escola</Text>
            <Text style={styles.alarmOverline}>5 Alarmes ativos de 6</Text>
            <Text style={styles.caption}>06:50 - 07:00 AM</Text>
          </View>
          <View style={styles.alarmDias}>
            <Text style={styles.alarmOverline}>D</Text>
            <Text style={styles.alarmOverline}>S</Text>
            <Text style={styles.alarmOverline}>T</Text>
            <Text style={styles.alarmOverline}>Q</Text>
            <Text style={styles.alarmOverline}>Q</Text>
            <Text style={styles.alarmOverline}>S</Text>
            <Text style={styles.alarmOverline}>S</Text>
          </View>
          <Switch value={false} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEEEF0",
    paddingHorizontal: 16,
    paddingTop: 64,
    gap: 32,
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
    padding: 16,
    backgroundColor: "#FEFEFF",
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  alarmTitle: {
    fontFamily: "nunito-medium",
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.014,
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
    flexDirection: "row",
    gap: 8,
  },
})
