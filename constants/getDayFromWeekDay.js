export function getDayFromWeekDay(weekDay) {  const lowerCaseWeekDay = weekDay.toLowerCase();
  switch (lowerCaseWeekDay) {
    case "domingo":
      return 1;
    case "segunda":
      return 2;
    case "terça":
      return 3;
    case "quarta":
      return 4;
    case "quinta":
      return 5;
    case "sexta":
      return 6;
    case "sábado":
      return 7;
    default:
      throw new Error("Dia da semana inválido");
  }
}
