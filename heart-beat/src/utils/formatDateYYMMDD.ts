export const formatDate = (dateStr: string) => {
  let date = new Date(dateStr);
  let day = String(date.getDate());
  let month = String(date.getMonth() + 1)
  if (day.length <2) {
    day = '0' + day
  }
  if (month.length <2) {
  month = '0' + month
  }
  let formattedDate =   `${date.getFullYear()}-${month}-${day}`;
  return formattedDate;
}