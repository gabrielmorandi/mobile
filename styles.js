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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
  },
});
