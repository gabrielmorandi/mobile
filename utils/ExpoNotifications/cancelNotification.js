export async function cancelNotification(notifId) {
    await Notifications.cancelScheduledNotificationAsync(notifId);
  }
  