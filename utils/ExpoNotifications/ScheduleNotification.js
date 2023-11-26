import weekDays from "../../constants/weekDays.js";
export async function schedulePushNotification(
  className,
  slot,
  type,
  time,
  day
) {
  time = new Date(time.getTime() - 5 * 60000);

  const weekday = weekDays[day];
  const hours = time.getHours();
  const minutes = time.getMinutes();

  const id = await Notifications.scheduleNotificationAsync({
    content: {
      title: className + " " + type,
      body: slot,
      sound: "/assets/sounds/alarm-clock-short-6402.mp3",
    },
    trigger: {
      weekday: weekday,
      hour: hours,
      minute: minutes,
      repeats: true,
    },
  });

  console.log(
    `Notificação agendada para ${hours}:${minutes} no dia: ${weekday}`
  );
  alert(`Alarme agendado para ${hours}:${minutes} no dia: ${weekday}`);
  return id;
}
