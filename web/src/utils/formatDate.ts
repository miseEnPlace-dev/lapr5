export function formatDate(string: string) {
  const dt = string.split(/-|\s|\//);

  const year = parseInt(dt[2]);
  const month = parseInt(dt[0]) - 1;
  const day = parseInt(dt[1]);

  const date = new Date(year, month, day);

  const formattedDay = date.getDate();
  const formattedMonth = date.getMonth() + 1;
  const formattedYear = date.getFullYear();

  return `${formattedDay}/${formattedMonth}/${formattedYear}`;
}