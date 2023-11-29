import { StyleSheet } from "react-native";
import colorsSchema from "./constants/colorsSchema";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorsSchema.Background,
    paddingHorizontal: 16,
    gap: 32,
    paddingTop: 64,
  },
  mainHeader: {
    backgroundColor: colorsSchema.Primary,
    gap: 24,
    borderRadius: 16,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 16,
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
    // fontFamily: "Nunito_500Medium",
    color: colorsSchema.Text,
    fontSize: 32,
    lineHeight: 48,
    letterSpacing: 5,
  },
  headerHome: {
    // fontFamily: "Nunito_500Medium",
    color: colorsSchema.Text,
    fontSize: 24,
    lineHeight: 24,
  },
  bom: {
    width: "100%",
    // fontFamily: "Nunito_400Regular",
    fontSize: 48,
    lineHeight: 56,
    color: colorsSchema.Text,
  },
  times: {
    flexDirection: "row",
    width: "100vh",
    gap: 32,
    alignItems: "baseline",
    color: colorsSchema.Text,
  },
  hour: {
    // fontFamily: "Nunito_400Regular",
    fontSize: 32,
    lineHeight: 48,
    color: colorsSchema.Text,
  },
  date: {
    // fontFamily: "Nunito_400Regular",
    fontSize: 24,
    color: colorsSchema.Text,
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
    backgroundColor: colorsSchema.Text,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    color: colorsSchema.Primary,
  },
  touchAlarm: {
    paddingVertical: 16,
    paddingLeft: 16,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  alarmTitle: {
    // fontFamily: "Nunito_500Medium",
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.014,
    color: colorsSchema.Secondary,
  },
  overline: {
    // fontFamily: "Nunito_400Regular",
    fontSize: 12,
    lineHeight: 20,
    color: colorsSchema.Secondary,
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
    // fontFamily: "Nunito_400Regular",
    fontSize: 24,
    color: colorsSchema.Text,
    lineHeight: 48,
    letterSpacing: 0.048,
  },
  noAlarmsText: {
    // fontFamily: "Nunito_400Regular",
    fontSize: 16,
    lineHeight: 48,
    color: colorsSchema.Text,
    letterSpacing: 0.048,
  },
  noGroupAlarmsTouch: {
    display: "flex",
    alignContent: "center",
    alignItems: "center",
    gap: 16,
  },
  noGroupAlarmsTitle: {
    // fontFamily: "Nunito_400Regular",
    fontSize: 24,
    lineHeight: 48,
    letterSpacing: 0.048,
  },
  noGroupAlarmsText: {
    // fontFamily: "Nunito_400Regular",
    fontSize: 16,
    lineHeight: 32,
    letterSpacing: 0.048,
  },
  alarmOverline: {
    // fontFamily: "Nunito_400Regular",
    fontSize: 14,
    lineHeight: 28,
    color: colorsSchema.Secondary,
  },
  caption: {
    // fontFamily: "Nunito_400Regular",
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
  centeredViewAlert: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color: colorsSchema.Secondary,
    marginTop: 22,
  },
  modalAlarm: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalView: {
    width: "100%",
    backgroundColor: colorsSchema.Primary,
    borderTopRightRadius: 28,
    borderTopLeftRadius: 28,
    padding: 35,
    elevation: 1,
    gap: 24,
  },
  modalViewAlert: {
    margin: 20,
    gap: 16,
    backgroundColor: colorsSchema.Accent,
    borderRadius: 20,
    padding: 20,
    alignItems: "left",
    shadowColor: "#000",
    color: colorsSchema.Secondary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
    color: colorsSchema.Text,
    gap: 8,
  },
  modalText: {
    color: colorsSchema.Text,
    // fontFamily: "Nunito_500Medium",
    fontSize: 18,
    lineHeight: 32,
  },
  modalTextAlert: {
    color: colorsSchema.Text,
    // fontFamily: "Nunito_500Medium",
    fontSize: 24,
    lineHeight: 24,
  },
  modalTitleAlert: {
    color: colorsSchema.Secondary,
    // fontFamily: "Nunito_500Medium",
    fontSize: 16,
    lineHeight: 24,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: colorsSchema.Accent,
    padding: 10,
    borderRadius: 10,
    // fontFamily: "Nunito_400Regular",
    fontSize: 16,
    color: colorsSchema.Text,
  },
  modalButtons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    color: colorsSchema.Secondary,
  },
  buttonClose: {
    color: colorsSchema.Secondary,
    // fontFamily: "Nunito_400Regular",
    fontSize: 16,
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  buttonCloseAlert: {
    // fontFamily: "Nunito_400Regular",

    paddingHorizontal: 24,
    borderRadius: 24,
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: colorsSchema.Secondary,
  },
  buttonCloseAlertText: {
    color: colorsSchema.Text,
    fontSize: 16,
  },
  buttonCreate: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    backgroundColor: colorsSchema.Secondary,
    color: colorsSchema.Text,
    borderRadius: 24,
    // fontFamily: "Nunito_500Medium",
    fontSize: 16,
  },
});

export default styles;
