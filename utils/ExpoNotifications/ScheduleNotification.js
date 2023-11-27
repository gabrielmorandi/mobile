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

  console.warn("Array recebido --->", alarm);

  // Mapeia os dias da semana corretamente
  const mappedDias = dias.map((dia) => getDayFromWeekDay(dia));

  // Schedule notifications for each selected day
  for (const selectedDay of mappedDias) {
    // Calcula a próxima ocorrência da notificação
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
      });

      const formattedDate = format(nextNotificationDate, "dd/MM/yyyy HH:mm", {
        timeZone: "America/Sao_Paulo",
        locale: ptBR,
      });

      console.warn(`Alerta criado: ${Notify} - ${formattedDate} - ${selectedDay}`);
       return Notify; // Retorna o ID da notificação
    } else {
      Alert.alert(
        "Não foi possível calcular a próxima ocorrência da notificação."
      );
    }
  }

  return;
}

function calculateNextNotificationDate(desiredTime, desiredWeekday) {
  // Converte a string de hora para um objeto de data
  const timeComponents = desiredTime.split(":");
  const notificationTime = new Date();
  notificationTime.setHours(parseInt(timeComponents[0], 10));
  notificationTime.setMinutes(parseInt(timeComponents[1], 10));
  notificationTime.setSeconds(0);

  // Obtém o dia da semana atual
  const currentDay = notificationTime.getDay();

  // Calcula a diferença de minutos entre o dia desejado e o dia atual
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

    // Se o horário desejado for menor ou igual ao horário atual, ajusta para a próxima semana
    if (currentMinutes >= desiredTimeMinutes) {
      minutesUntilNotification += 7 * 24 * 60; // avança para a próxima semana
    }
  }

  // Calcula a diferença de minutos entre o dia desejado e o dia atual
  minutesUntilNotification += ((desiredWeekday - currentDay + 7) % 7) * 24 * 60;

  // Calcula a data da próxima ocorrência da notificação
  const nextNotificationDate = new Date(
    notificationTime.getTime() + minutesUntilNotification * 60 * 1000
  );

  return nextNotificationDate;
}

export default schedulePushNotifications;
