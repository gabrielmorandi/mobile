import * as Notifications from "expo-notifications";async function cancelNotification(notifId) {
  if (notifId) {
    await Notifications.cancelScheduledNotificationAsync(notifId);
    console.log(`Notificação com o id ${notifId} cancelada`);
  } else {
    console.warn("Attempted to cancel a null notification.");
  }
}

export default cancelNotification;
