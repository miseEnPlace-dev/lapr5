export function formatDate(string: string) {
  const dt = string.split(/-|\s|\//);
  const date = new Date(
    new Date(dt.slice(0, 3).reverse().join("-") + " " + dt[3])
  );
  console.log(string);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}
