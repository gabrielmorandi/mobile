import * as Notifications from "expo-notifications";import { Alert } from "react-native";
import { format, set } from "date-fns";
import { ptBR } from "date-fns/locale";
import { utcToZonedTime } from "date-fns-tz";
import { weekDays } from "../../constants/weekDays";
import { getDayFromWeekDay } from "../../constants/getDayFromWeekDay";

async function schedulePushNotifications(alarm) {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

  const { status } = await Notifications.getPermissionsAsync();

  if (status !== "granted") {
    Alert.alert("Permita as notificações!");
    return;
  }

  const { id, nome, hora, ativo, dias, grupo } = alarm;

  console.log("Array recebido --->", alarm);

  const mappedDias = dias.map((dia) => getDayFromWeekDay(dia));

  const notifications = [];
  const dates = [];

  for (const selectedDay of mappedDias) {
    const nextNotificationDate = calculateNextNotificationDate(
      hora,
      selectedDay
    );

    if (nextNotificationDate) {
      const Notify = await Notifications.scheduleNotificationAsync({
        content: {
          id: id,
          title: `Alarme do grupo ${grupo}`,
          body: `Seu alarme das ${hora} está ativo.`,
        },
        trigger: {
          repeats: true,
          weekday: selectedDay,
          hour: parseInt(hora.split(":")[0]),
          minute: parseInt(hora.split(":")[1]),
        },
        actions: [{ identifier: "RESPOND", title: "Desligar" }],
        vibrate: [1000, 1000, 1000],
      });

      const formattedDate = format(nextNotificationDate, "dd/MM/yyyy", {
        timeZone: "America/Sao_Paulo",
        locale: ptBR,
      });

      notifications.push(Notify);
      dates.push(formattedDate);
    } else {
      Alert.alert(
        "Não foi possível calcular a próxima ocorrência da notificação."
      );
    }
  }

  console.log(
    `\n
    -----------------------------------
    Alertas criados: ${notifications}\n 
    Para as datas - ${dates}\n
    Dias da semana - ${dias}\n
    Horário: ${hora}\n
    -----------------------------------`
  );

  return notifications;
}

function calculateNextNotificationDate(desiredTime, desiredWeekday) {
  const timeComponents = desiredTime.split(":");
  const notificationTime = new Date();
  notificationTime.setHours(parseInt(timeComponents[0], 10));
  notificationTime.setMinutes(parseInt(timeComponents[1], 10));
  notificationTime.setSeconds(0);

  const currentDayNumber = new Date().getDay();
  const currentDayName = Object.values(weekDays)[currentDayNumber];
  const currentDay = getDayFromWeekDay(currentDayName);

  let minutesUntilNotification = 0;

  if (currentDay === desiredWeekday) {
    const currentTime = Date.now();
    const desiredTimeMinutes =
      notificationTime.getHours() * 60 + notificationTime.getMinutes();
    const currentMinutes =
      new Date(currentTime).getHours() * 60 +
      new Date(currentTime).getMinutes();

    console.log(
      "ATUAL TIME:",
      currentMinutes,
      "TEMPO DESEJADO:",
      desiredTimeMinutes
    );

    if (currentMinutes >= desiredTimeMinutes) {
      minutesUntilNotification += 7 * 24 * 60;
    }
  }

  minutesUntilNotification += ((desiredWeekday - currentDay + 7) % 7) * 24 * 60;

  const nextNotificationDate = new Date(
    notificationTime.getTime() + minutesUntilNotification * 60 * 1000
  );

  return nextNotificationDate;
}

export default schedulePushNotifications;
