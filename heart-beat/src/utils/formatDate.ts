export const formatDate = (dateStr: string) => {
  let date = new Date(dateStr);
  let formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  return formattedDate;
}