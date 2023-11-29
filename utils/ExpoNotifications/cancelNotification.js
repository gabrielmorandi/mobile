import * as Notifications from "expo-notifications";async function cancelNotification(notifId) {
  console.log("ID NOTIFICAÇÃO RECEBIDA PARA DELETAR: ", notifId);
  if (notifId && typeof notifId === "string") {
    await Notifications.cancelScheduledNotificationAsync(notifId);
    console.log(`Notificação com o id ${notifId} cancelada`);
  } else {
    console.warn(
      "Tentativa de cancelar uma notificação nula ou com tipo inválido."
    );
  }
}

export default cancelNotification;
