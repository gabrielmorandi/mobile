import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEEEF0",
    paddingHorizontal: 16,
    gap: 32,
    paddingTop: 64,
  },
  mainHeader: {
    gap: 8,
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
  times: {
    flexDirection: "row",
    width: "100vh",
    gap: 32,
    alignItems: "baseline",
  },
  hour: {
    fontFamily: "nunito-regular",
    fontSize: 32,
    lineHeight: 48,
  },
  date: {
    fontFamily: "nunito-regular",
    fontSize: 24,
    lineHeight: 32,
  },
  scroll: {
    marginBottom: 16,
  },
  alarms: {
    marginBottom: 16,
    gap: 24,
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
    fontSize: 15,
    lineHeight: 20,
  },
  containerTextAlarm: {
    display: "flex",
    alignItems: "center",
    gap: 16,
  },
  noAlarmsTouch: {
    display: "flex",
    alignContent: "center",
    alignItems: "center",
    gap: 16,
  },
  noAlarmsTitle: {
    fontFamily: "nunito-regular",
    fontSize: 24,
    lineHeight: 48,
    letterSpacing: 0.048,
  },
  noAlarmsText: {
    fontFamily: "nunito-regular",
    fontSize: 16,
    lineHeight: 32,
    letterSpacing: 0.048,
  },
  noGroupAlarmsTouch: {
    display: "flex",
    alignContent: "center",
    alignItems: "center",
    gap: 16,
  },
  noGroupAlarmsTitle: {
    fontFamily: "nunito-regular",
    fontSize: 24,
    lineHeight: 48,
    letterSpacing: 0.048,
  },
  noGroupAlarmsText: {
    fontFamily: "nunito-regular",
    fontSize: 16,
    lineHeight: 32,
    letterSpacing: 0.048,
  },
  alarmOverline: {
    fontFamily: "nunito-regular",
    fontSize: 20,
    lineHeight: 28,
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
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalAlarm: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalView: {
    width: "100%",
    backgroundColor: "white",
    borderTopRightRadius: 28,
    borderTopLeftRadius: 28,
    padding: 35,
    elevation: 1,
    gap: 24,
  },
  modaAlarmlView: {
    width: "100%",
    backgroundColor: "white",
    borderTopRightRadius: 28,
    borderTopLeftRadius: 28,
    elevation: 1,
    gap: 24,
  },
  modalTitle: {
    gap: 8,
  },
  modalText: {
    color: "#70797E",
    fontFamily: "nunito-medium",
    fontSize: 16,
    lineHeight: 32,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#70797E",
    padding: 10,
    borderRadius: 10,
    fontFamily: "nunito-regular",
    fontSize: 16,
    color: "#70797E",
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
});




