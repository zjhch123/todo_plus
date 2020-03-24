export function dateFormat(timestamp) {
  const ts = timestamp || Date.now();
  const date = new Date(ts);

  const year = date.getUTCFullYear();
  const month = '0' + (parseInt(date.getUTCMonth(), 10) + 1);
  const day = '0' + date.getUTCDate();

  const formattedDate = `${year}-${month.slice(-2)}-${day.slice(-2)}`;

  return `${formattedDate}`;
}
