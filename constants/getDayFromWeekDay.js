export function getDayFromWeekDay(weekDay) {  const lowerCaseWeekDay = weekDay.toLowerCase();
  switch (lowerCaseWeekDay) {
    case "domingo":
      return 0;
    case "segunda":
      return 1;
    case "terça":
      return 2;
    case "quarta":
      return 3;
    case "quinta":
      return 4;
    case "sexta":
      return 5;
    case "sábado":
      return 6;
    default:
      throw new Error("Dia da semana inválido");
  }
}
